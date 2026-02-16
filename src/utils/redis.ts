import { redisConnect } from '@/libs/redis/redisConfig';
import { TIME_SESSION_REDIS } from '@/constans';
import type { Tenant } from '@/interfaces';

export async function getSessionData(tenant: Tenant, sessionId: string) {
  const redis = await redisConnect(tenant);
  const data = await redis.get(sessionId);
  await redis.expire(sessionId, TIME_SESSION_REDIS);
  await redis.quit();
  return data ? JSON.parse(data) : null;
}

export async function saveSessionData(tenant: Tenant, sessionId: string, data: object) {
  const redis = await redisConnect(tenant);
  const pipeline = redis.pipeline();
  pipeline.set(sessionId, JSON.stringify(data));
  pipeline.expire(sessionId, TIME_SESSION_REDIS);
  await pipeline.exec();
  await redis.quit();
}

export async function deleteSessionData(tenant: Tenant, sessionId: string) {
  const redis = await redisConnect(tenant);
  const pipeline = redis.pipeline();
  pipeline.del(sessionId);
  await pipeline.exec();
  await redis.quit();
}
