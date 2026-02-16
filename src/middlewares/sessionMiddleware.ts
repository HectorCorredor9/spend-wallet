import type { NextResponse } from 'next/server';
// Internal app
import { Tenant } from '@/interfaces';
import { cookieValues, getSessionId } from '@/utils';
import { sessionSetts } from '@/tenants/tenantSettings';
import { apiPaths, headersKey, sessCookieName } from '@/constans';

export async function handleSession(tenant: Tenant, response: NextResponse, requestOrigin: string) {
  const { sessExpTime } = await sessionSetts(tenant);
  const sessionId = await getSessionId();

  if (sessionId && typeof sessionId === 'string' && sessionId.length > 10) {
    const cookieSession = cookieValues({
      name: sessCookieName,
      value: sessionId,
      sameSite: 'strict',
      expires: sessExpTime + 10,
    });
    response.cookies.set(cookieSession);
    return;
  }

  const url = `${requestOrigin}${apiPaths.appAPiV1}/session`;

  try {
    const fetchResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        [headersKey.appTenant]: tenant,
      },
      body: JSON.stringify({ tenant, sessionId }),
    });

    if (!fetchResponse.ok) {
      console.error('Session request failed with status:', fetchResponse.status);
      return;
    }

    const data = await fetchResponse.json();

    const cookieSesion = cookieValues({
      name: sessCookieName,
      value: data.sessionId,
      sameSite: 'strict',
      expires: sessExpTime + 10,
    });

    response.cookies.set(cookieSesion);
  } catch (error) {
    console.error('Session creation error:', (error as Error).message);
  }
}
