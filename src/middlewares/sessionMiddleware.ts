import type { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import uuid4 from 'uuid4';
// Internal app
import type { Tenant } from '@/interfaces';
import { cookieValues, getSessionId } from '@/utils';
import { sessCookieName, prefixCookieName } from '@/constans';
import { sessSettings } from '@/constans/httpConstans';

// Session config from env vars (no 'use server' imports needed)
const DEFAULT_SESS_EXP_TIME = 600;
const DEFAULT_SESS_RESET_TIME = 0;

function getSessionConfig() {
  const sessExpTime = sessSettings.sessExpTime
    ? parseInt(sessSettings.sessExpTime)
    : DEFAULT_SESS_EXP_TIME;
  const sessResetTime = sessSettings.sessResetTime
    ? parseInt(sessSettings.sessResetTime)
    : DEFAULT_SESS_RESET_TIME;
  return { sessExpTime, sessResetTime };
}

function getRedis(tenant: Tenant) {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
  const keyPrefix = `${prefixCookieName}${tenant}:`;
  return { redis, keyPrefix };
}

export async function handleSession(tenant: Tenant, response: NextResponse) {
  const { sessExpTime, sessResetTime } = getSessionConfig();
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
    const timePlus = 20;
    const { redis, keyPrefix } = getRedis(tenant);

    let newSessionId = sessionId || uuid4();
    let currentTime = Date.now();
    let sessionData: Record<string, string> = {
      sessionId: '',
      tenant: tenant,
      sessExpTime: '',
      createdAt: '',
    };

    const key = `${keyPrefix}${newSessionId}`;
    const currentData = await redis.get<string>(key);

    if (currentData) {
      const parsed = typeof currentData === 'string' ? JSON.parse(currentData) : currentData;
      sessionData = parsed;
      const createdAt = Number.parseInt(sessionData.createdAt ?? '0');
      const sessionAge = (currentTime - createdAt) / 1000;
      if (sessionAge >= sessResetTime) {
        await redis.del(key);
        newSessionId = uuid4();
        currentTime = Date.now();
      } else {
        currentTime = createdAt;
      }
    }

    sessionData.sessionId = newSessionId;
    sessionData.tenant = tenant;
    sessionData.sessExpTime = `${sessExpTime}`;
    sessionData.createdAt = `${currentTime}`;

    const newKey = `${keyPrefix}${newSessionId}`;
    await redis.set(newKey, JSON.stringify(sessionData), { ex: sessExpTime + timePlus });

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
