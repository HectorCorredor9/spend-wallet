import type { NextResponse } from 'next/server';
// Internal app
import { Tenant } from '@/interfaces';
import { cookieValues, getSessionId } from '@/utils';
import { sessionSetts } from '@/tenants/tenantSettings';
import { sessCookieName } from '@/constans';
import { createRefreshSess } from '@/libs/redis';

export async function handleSession(tenant: Tenant, response: NextResponse) {
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

  try {
    const newSessionId = await createRefreshSess(tenant, sessionId);

    const cookieSesion = cookieValues({
      name: sessCookieName,
      value: newSessionId,
      sameSite: 'strict',
      expires: sessExpTime + 10,
    });

    response.cookies.set(cookieSesion);
  } catch (error) {
    console.error('Session creation error:', (error as Error).message);
  }
}
