import React from 'react';
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

jest.mock('jose', () => {
  return {
    __esModule: true,
    compactDecrypt: jest.fn(() => {
      return { plaintext: 'mocked plaintext' };
    }),
  };
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  useFormatter: () => ({
    dateTime: jest.fn(),
    number: jest.fn(),
    relativeTime: jest.fn(),
  }),
  useMessages: () => ({}),
  useNow: () => new Date(),
  useTimeZone: () => 'UTC',
}));

jest.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) => key,
  getLocale: () => 'en',
  getFormatter: () => ({
    dateTime: jest.fn(),
    number: jest.fn(),
    relativeTime: jest.fn(),
  }),
  getMessages: () => ({}),
  getNow: () => new Date(),
  getTimeZone: () => 'UTC',
}));

// Mock browser globals
Object.defineProperty(global, 'Request', {
  value: class Request {
    constructor(input: any, init?: any) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.headers = new Map(Object.entries(init?.headers || {}));
    }
    url: string;
    method: string;
    headers: Map<string, string>;
  },
});

Object.defineProperty(global, 'Headers', {
  value: class Headers {
    private headers = new Map<string, string>();
    constructor(init?: any) {
      if (init) {
        Object.entries(init).forEach(([key, value]) => {
          this.headers.set(key, value as string);
        });
      }
    }
    get(name: string) {
      return this.headers.get(name) || null;
    }
    set(name: string, value: string) {
      this.headers.set(name, value);
    }
    has(name: string) {
      return this.headers.has(name);
    }
  },
});

Object.defineProperty(global, 'Response', {
  value: class Response {
    constructor(body?: any, init?: any) {
      this.status = init?.status || 200;
      this.statusText = init?.statusText || 'OK';
      this.headers = new Map(Object.entries(init?.headers || {}));
      this.body = body;
    }
    status: number;
    statusText: string;
    headers: Map<string, string>;
    body: any;
    json() {
      return Promise.resolve(this.body);
    }
    text() {
      return Promise.resolve(String(this.body));
    }
  },
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/test',
    query: {},
    asPath: '/test',
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/test',
}));

// Mock Zustand stores
jest.mock('@/store', () => ({
  useUiStore: () => ({
    setLoadingScreen: jest.fn(),
    setPopperError: jest.fn(),
  }),
  useTenantStore: () => ({
    tenantSett: {
      tenant: 'test',
      sessResetTime: 30,
      tenantUri: 'test-uri',
    },
  }),
  useSessionStorage: () => ({
    resetSessStore: jest.fn(),
  }),
  useMenuStore: () => ({}),
}));

// Mock hooks
jest.mock('@/hooks', () => ({
  useBrowserRequest: () => ({
    createBrowserRequest: jest.fn(() => Promise.resolve({ payload: {} })),
  }),
}));

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({
    mutate: jest.fn(),
    isPending: false,
    isError: false,
  }),
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

module.exports = {
  preset: 'next/jest',
};
