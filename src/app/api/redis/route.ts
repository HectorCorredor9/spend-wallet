import { NextRequest, NextResponse } from 'next/server';
//Internal app
import { getSessionData, saveSessionData } from '@/utils/redis';
import { currenTenant, getSessionId } from '@/utils';

const cleanKeys = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(cleanKeys);
  const cleaned: Record<string, any> = {};
  for (const key of Object.keys(obj)) {
    cleaned[key] = cleanKeys(obj[key]);
  }
  return cleaned;
};

export async function GET() {
  try {
    const sessionId = await getSessionId();
    const tenant = await currenTenant();
    const data = await getSessionData(tenant, sessionId);

    if (!sessionId) {
      return new NextResponse(JSON.stringify({ error: 'No backoffice_info cookie present' }), { status: 400 });
    }

    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  } catch {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sessionId = await getSessionId();
    const tenant = await currenTenant();
    const dataBody = await request.json();
    const decryptData = JSON.parse(dataBody.data);
    const cleanedData = cleanKeys(decryptData.data);
    const dataRedis = await getSessionData(tenant, sessionId);
    let stateObject: any;

    if (!sessionId) {
      return NextResponse.json({ error: 'No backoffice_info cookie present' }, { status: 400 });
    }

    if (dataRedis) {
      stateObject = dataRedis;
      const newObject = { ...stateObject, ...cleanedData };
      if (JSON.stringify(stateObject) !== JSON.stringify(newObject)) {
        await saveSessionData(tenant, sessionId, newObject);
      }
    } else {
      await saveSessionData(tenant, sessionId, cleanedData);
    }

    const res = { data: { code: '200.00.000', message: 'ok' } };
    const response = JSON.stringify(res);
    return new NextResponse(JSON.stringify({ data: response }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail', error: String(error) }, { status: 500 });
  }
}
