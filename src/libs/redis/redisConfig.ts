import { Redis } from '@upstash/redis';
// Internal app
import { Tenant } from '@/interfaces';

let redisInstance: Redis | null = null;

function getRedis(): Redis {
  if (!redisInstance) {
    redisInstance = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });
  }
  return redisInstance;
}

export function redisKey(tenant: Tenant, key: string): string {
  return `wallet_${tenant}:${key}`;
}

export async function redisConnect(tenant: Tenant) {
  const redis = getRedis();
  const prefix = `wallet_${tenant}:`;

  return {
    async get(key: string) {
      const result = await redis.get<string>(`${prefix}${key}`);
      return result ?? null;
    },
    async set(key: string, value: string) {
      await redis.set(`${prefix}${key}`, value);
    },
    async expire(key: string, seconds: number) {
      await redis.expire(`${prefix}${key}`, seconds);
    },
    async del(key: string) {
      await redis.del(`${prefix}${key}`);
    },
    async setWithExpire(key: string, value: string, seconds: number) {
      await redis.set(`${prefix}${key}`, value, { ex: seconds });
    },
    async quit() {
      // No-op: Upstash Redis is stateless/REST-based, no connection to close
    },
    pipeline() {
      const ops: Array<() => Promise<unknown>> = [];
      const pipelineApi = {
        set(key: string, value: string) {
          ops.push(() => redis.set(`${prefix}${key}`, value));
          return pipelineApi;
        },
        expire(key: string, seconds: number) {
          ops.push(() => redis.expire(`${prefix}${key}`, seconds));
          return pipelineApi;
        },
        del(key: string) {
          ops.push(() => redis.del(`${prefix}${key}`));
          return pipelineApi;
        },
        async exec() {
          await Promise.all(ops.map((op) => op()));
        },
      };
      return pipelineApi;
    },
  };
}
