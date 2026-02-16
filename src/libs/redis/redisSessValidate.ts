'use server';

import uuid4 from 'uuid4';
// Internal app
import { Tenant, SessionData } from '@/interfaces';
import { redisConnect } from '../redis/redisConfig';
import { currenTenant, getSessionId } from '@/utils';
import { sessionSetts } from '@/tenants/tenantSettings';
import { TIME_SESSION_REDIS } from '@/constans';

export async function redisSession(tenant?: Tenant) {
  tenant = tenant ?? (await currenTenant());
  const sessionId = await getSessionId();
  const redisInstance = await redisConnect(tenant);

  return { redisInstance, sessionId, tenant };
}

export async function createRefreshSess(tenant: Tenant, currentId: string) {
  const timePlus = 20;
  const { redisInstance } = await redisSession(tenant);
  const { sessExpTime, sessResetTime = 0 } = await sessionSetts(tenant);

  let sessionId = currentId || uuid4();
  let currentTime = Date.now();
  let sessionData: SessionData = {
    sessionId: '',
    tenant: tenant,
    sessExpTime: '',
    createdAt: '',
  };

  const currentData = await redisInstance.get(sessionId);
  if (currentData) {
    sessionData = JSON.parse(currentData);
    const createdAt = Number.parseInt(sessionData.createdAt ?? '0');
    const sessionAge = (currentTime - createdAt) / 1000;
    if (sessionAge >= sessResetTime) {
      sessionId = uuid4();
      currentTime = Date.now();
      if (sessionId) await redisInstance.del(sessionId);
    } else {
      currentTime = createdAt;
    }
  }
  sessionData.sessionId = sessionId;
  sessionData.tenant = tenant;
  sessionData.sessExpTime = `${sessExpTime}`;
  sessionData.createdAt = `${currentTime}`;

  await redisInstance.set(sessionId, JSON.stringify(sessionData));
  await redisInstance.expire(sessionId, sessExpTime + timePlus);
  await redisInstance.quit();
  return sessionId;
}

export async function setSession(sessAttr: Record<string, unknown>) {
  sessAttr.logged = true;

  await setSessAttr(sessAttr);
}

export async function setSessAttr(field: object) {
  const { redisInstance, sessionId } = await redisSession();
  let sessionData: SessionData = {
    sessionId: '',
    tenant: undefined as unknown as Tenant,
    sessExpTime: '',
    createdAt: '',
  };
  const currentData = await redisInstance.get(sessionId);
  if (currentData) {
    sessionData = JSON.parse(currentData);
  }
  sessionData = { ...sessionData, ...field };
  const pipeline = redisInstance.pipeline();
  pipeline.set(sessionId, JSON.stringify(sessionData));
  pipeline.expire(sessionId, TIME_SESSION_REDIS);
  await pipeline.exec();
  await redisInstance.quit();
  return sessionData;
}

export async function getSessAttr(name: string) {
  const { redisInstance, sessionId } = await redisSession();
  const currentData = await redisInstance.get(sessionId);
  await redisInstance.quit();
  if (!currentData) return null;
  const sessionData = JSON.parse(currentData);
  return sessionData[name];
}

export async function deleteSessAttr(list: string[]) {
  const { redisInstance, sessionId } = await redisSession();
  const currentData = await redisInstance.get(sessionId);
  if (!currentData) {
    await redisInstance.quit();
    return;
  }
  const sessionData = JSON.parse(currentData);
  for (const key of list) {
    delete sessionData[key];
  }
  const pipeline = redisInstance.pipeline();
  pipeline.set(sessionId, JSON.stringify(sessionData));
  pipeline.expire(sessionId, TIME_SESSION_REDIS);
  await pipeline.exec();
  await redisInstance.quit();
}

export async function deleteSess() {
  const { redisInstance, sessionId } = await redisSession();
  await redisInstance.del(sessionId);
  await redisInstance.quit();
}
