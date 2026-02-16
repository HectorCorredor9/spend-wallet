import { createJSONStorage, StateStorage } from 'zustand/middleware';
import { setDataRedis } from '@/utils/tools';

const storageApi: StateStorage = {
  getItem: async function (sessionId: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/redis`);
      const data = await res.json();
      if (data.data) {
        const response: Record<string, any> = JSON.parse(data.data);
        return JSON.stringify(response[sessionId]);
      }
      return '';
    } catch {
      return null;
    }
  },

  setItem: async function (sessionId: string, value: any) {
    try {
      const newValue = JSON.parse(value);
      const updateObject = { [sessionId]: newValue };
      await setDataRedis('PUT', { data: updateObject });
    } catch (error) {
      console.error('Error setItem redisStorage:', error);
    }
  },

  removeItem: async function (sessionId: string) {
    try {
      await setDataRedis('DELETE', { key: sessionId });
    } catch (error) {
      console.error('Error removeItem redisStorage:', error);
    }
  },
};

export const redisStorage = createJSONStorage(() => storageApi);
