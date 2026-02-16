import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// Mock Web APIs that are not available in Jest environment
global.Request = class Request {
  constructor(input: any, init?: any) {
    this.url = typeof input === 'string' ? input : input.url;
    this.method = init?.method || 'GET';
    this.headers = new Map(Object.entries(init?.headers || {}));
    this.body = init?.body;
  }
  url: string;
  method: string;
  headers: Map<string, string>;
  body: any;
} as any;

global.Response = class Response {
  constructor(body?: any, init?: any) {
    this.status = init?.status || 200;
    this.statusText = init?.statusText || 'OK';
    this.headers = new Map(Object.entries(init?.headers || {}));
    this._body = body;
  }
  status: number;
  statusText: string;
  headers: Map<string, string>;
  _body: any;
  async json() {
    return this._body;
  }
  async text() {
    return this._body;
  }
} as any;

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
  }),
) as any;

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
    dateTime: (date: Date) => date.toLocaleDateString(),
    number: (num: number) => num.toString(),
  }),
  NextIntlClientProvider: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => null),
  }),
  useParams: () => ({
    tenant: 'test-tenant',
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({
    mutate: jest.fn(),
    isLoading: false,
    error: null,
  }),
  useQuery: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  QueryClient: jest.fn().mockImplementation(() => ({
    invalidateQueries: jest.fn(),
  })),
  QueryClientProvider: jest.fn().mockImplementation(({ children }) => children),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => null),
}));

jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn(() => ({ json: jest.fn() })),
    redirect: jest.fn(),
  },
}));

// Mock server-side modules that shouldn't be imported in client tests
jest.mock('@/libs/axios/connectServiceAxios', () => ({
  connectServices: jest.fn(),
}));

jest.mock('@/tenants/tenantSettings', () => ({
  appCredSetts: jest.fn(() => Promise.resolve({ tenantId: 'test-tenant' })),
}));

jest.mock('@/libs/http', () => ({
  createHttpConfig: jest.fn(),
}));

jest.mock('@/utils/redis', () => ({
  redisGet: jest.fn(),
  redisSet: jest.fn(),
  redisDel: jest.fn(),
}));

// Mock Zustand stores
jest.mock('@/store', () => ({
  useMenuStore: jest.fn(() => ({
    setCurrentItem: jest.fn(),
  })),
  useRoutesStore: jest.fn(() => ({
    loginRoute: 'signin',
    setRoute: jest.fn(),
  })),
  useSessionStorage: jest.fn(() => ({
    setSessReset: jest.fn(),
    resetSessStore: jest.fn(),
  })),
  useTenantStore: jest.fn(() => ({
    tenantSett: {
      tenant: 'test-tenant',
      tenantUri: 'test-tenant',
      sessResetTime: 5,
    },
  })),
  useUiStore: jest.fn(() => ({
    loadingScreen: jest.fn(),
    setPopperError: jest.fn(),
  })),
  useModeStore: jest.fn(() => ({})),
}));

// Mock utils/tools
jest.mock('@/utils/tools', () => ({
  getImages: jest.fn((tenant: string, image: string) => `/images/${tenant}/${image}`),
  getSchema: jest.fn(),
}));

// Mock hooks
jest.mock('@/hooks', () => ({
  useBrowserRequest: jest.fn(() => ({
    createBrowserRequest: jest.fn(),
  })),
  useInitStatesHook: jest.fn(),
  useRequestCodeHook: jest.fn(),
  useSessionActionsHook: jest.fn(),
  useSessionControlHook: jest.fn(),
}));

module.exports = {
  preset: 'next/jest',
};
