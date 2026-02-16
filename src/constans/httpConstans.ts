// Environment variable for the web environment, defaults to 'local' if not set
export const webEnv = process.env.WEB_ENV ?? 'local';

// Base path for API endpoints
export const apiSrc = '/api';

/**
 * Prefix of the application cookies.
 */
export const prefixCookieName = 'wallet_';

/**
 * Name of the application cookie.
 */
export const tenantCookieName = `${prefixCookieName}tenant`;

/**
 * Name of the session cookie.
 */
export const sessCookieName = `${prefixCookieName}info`;

/**
 * Name of the tenant cookie.
 */
export const langCookieName = `${prefixCookieName}lang`;

/**
 * Name of the user name cookie.
 */
export const userNameCookieName = `${prefixCookieName}username`;

/**
 * Base URLs for the application and services.
 */
export const baseURLs = {
  app: process.env.WEB_URL,
  serv: process.env.SERV_URL,
};

/**
 * API Paths constructed using template literals.
 */
export const apiPaths = {
  apiSearch: /^\/api\/v\d+(\.\d+)*\//, // Regular expression for API search
  appAPiV1: `${apiSrc}/app-v1`, // Application API path for internal requests
  appApiServ: '/services', // Services API endpoint
  appBrowserApi: `${apiSrc}/v1.0.0`, // API version for browser to application requests
  onboardingApi: `${apiSrc}/v0/onboarding`,
  customersApi: `${apiSrc}/v1.1`, // API version for customer requests
  cardsSolApiV3: `${apiSrc}/v1.3`, // API version V1.3 for cards solution requests
  cardsSolApiV4: `${apiSrc}/v1.4`, // API version V1.4 for cards solution requests
  cardsSolDirect: `${apiSrc}/v1/direct/cards`, // API version for cards solution requests directly to the backend
  accountsApi: `${apiSrc}/v1.1`, // API version for accounts requests
  accountsApiDirect: `${apiSrc}/v1/direct/accounts`, // API version for accounts solution requests directly to the backend
  contactsApi: `${apiSrc}/v1/contacts`, // API version for contacts requests
  cashOperationsApi: `${apiSrc}/v0/cashoperations`, // API version for cash operations requests
};

/**
 * Header keys used in API requests
 */
export const headersKey = {
  contentType: 'content-type', // Header key for content type
  authorization: 'authorization', // Header key for content type
  appTenant: 'app-tenant', // Header key for tenant
  appContentSecurity: 'app-content-security', // Header key for content security status
  appOriginPath: 'app-origin-path', // Header key for application origin path
  appJwsToken: 'app-token', // Header key for application JWS token
  AppReqId: 'app-request-id', // Header key for application JWS token
  appCookie: 'cookie', // Header key for app cookies
  servJwsToken: 'x-token', // Header key for service JWS token
  servTenantId: 'x-tenant-id', // Header key for service tenant ID
  servReqId: 'x-request-id', // Header key for service request ID
};

/**
 * Cipher microservice settings
 */
export const cipherBack = {
  enc: 'enc',
  dnc: 'dnc',
} as const;

/**
 * Cookie settings
 */
export const cookieSettings = {
  defaultPath: '/',
  defaultSameSite: 'lax' as const,
  defaultExpires: process.env.COOKIE_EXPIRES ?? new Date(Date.now() + 24 * 60 * 60 * 1000),
};

/**
 * Session settings
 */
export const sessSettings = {
  sessExpTime: process.env.SESS_EXP_TIME,
  sessResetTime: process.env.SESS_RESET_TIME,
  sessMatchIp: process.env.SESS_MATCH_IP,
  sessRefresh: process.env.SESS_REFRESH,
};

/**
 * Application keys
 */
export const Appkeys = {
  secJweStr: process.env.SEC_JWE_STR,
  secJwsStr: process.env.SEC_JWS_STR,
};

/**
 * Web RSA keys
 */
export const webRsakeys = {
  webJwePrivKey: process.env.WEB_JWE_PRIV_KEY,
  webJwePubKey: process.env.WEB_JWE_PUB_KEY,
  webJwsPrivKey: process.env.WEB_JWS_PRIV_KEY,
  webJwsPubKey: process.env.WEB_JWS_PUB_KEY,
};

/**
 * Service RSA keys
 */
export const servRsakeys = {
  servJwePrivKey: process.env.SERV_JWE_PRIV_KEY,
  servJwePubKey: process.env.SERV_JWE_PUB_KEY,
  servJwsPrivKey: process.env.SERV_JWS_PRIV_KEY,
  servJwsPubKey: process.env.SERV_JWS_PUB_KEY,
};

/**
 * HTTP Error Codes
 */
export const httpErrorCodes = {
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

/**
 * HTTP Status Codes
 */
export const httpStatusCodes = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
} as const;
