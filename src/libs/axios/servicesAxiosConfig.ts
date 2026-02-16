'use server';

import axios from 'axios';
import { importPKCS8, importSPKI } from 'jose';
// Internal app
import { setLogger } from '@/utils/tools';
import { createResponseApi } from '../http';
import { currenTenant, readCookieEncrypted } from '@/utils';
import { assetSetts, servHttpSetts } from '@/tenants/tenantSettings';
import { createErrorResponseApi, servicesUrl } from './helpersAxios';
import { decryptData, disassembleJWS, encryptData, signData } from '@/security';
import { jwtAlgs, headersKey, cipherBack, userNameCookieName } from '@/constans';

/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
const servicesAxios = axios.create();

const requestLogData = (method: string | undefined, url: string | undefined, headers: any, data: any) => ({
  method: (method || 'options') as 'options' | 'get' | 'delete' | 'head' | 'post' | 'put' | 'patch',
  pathUrl: url as string,
  httpConfig: {
    headers: Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, String(v)])),
    timeout: 0,
    validateStatus: () => true,
    withCredentials: false,
  },
  dataRequest: data,
});

/**
 * Interceptor for handling request encryption and signing.
 * Encrypts the request data and signs it before sending.
 */
servicesAxios.interceptors.request.use(async (request) => {
  const { timeZone } = await assetSetts();
  const timestamp = new Date().toLocaleString('sv-SE', { timeZone });
  const { enc } = cipherBack;
  const { data, headers, url } = request;
  delete request.headers[headersKey.appContentSecurity];
  const tempTenantId = headers[headersKey.servTenantId];
  const { servJwePubKey, servJwsPrivKey } = await servHttpSetts();
  const { baseURL, uri, tenantId, security } = await servicesUrl(`${url}`, tempTenantId);
  headers[headersKey.appContentSecurity] = security;
  headers[headersKey.servTenantId] = tenantId;
  request.baseURL = baseURL;
  request.url = uri;

  const contentSecurity = headers[headersKey.appContentSecurity];
  const userName = (await readCookieEncrypted(userNameCookieName)) || 'unknown';

  setLogger(
    'info',
    'REQUEST',
    requestLogData(request.method, request.url, request.headers, request.data),
    request.baseURL || '',
    timestamp,
    userName
  );

  if (data?.payload) {
    try {
      let { payload } = data;

      if (contentSecurity === enc) {
        const secretJwe = await importSPKI(servJwePubKey, jwtAlgs.jweAlgRsa);
        payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgRsa);
        const secretJws = await importPKCS8(servJwsPrivKey, jwtAlgs.jwsAlgRsa);
        const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
        const authJws = disassembleJWS(signedData);
        headers[headersKey.servJwsToken] = `JWS ${authJws}`;
        request.data = { data: payload };
      } else {
        request.data = payload;
      }
    } catch (error) {
      setLogger(
        'error',
        'REQUEST',
        requestLogData(request.method, request.url, request.headers, request.data),
        request.baseURL || '',
        timestamp,
        userName
      );
      throw new Error(`servicesAxios Request: (${(error as Error).message})`);
    }
  }

  return request;
});

/**
 * Interceptor for handling response decryption and verification.
 * Verifies the response signature and decrypts the data.
 */
servicesAxios.interceptors.response.use(
  async (response) => {
    const { enc } = cipherBack;
    const tenant = await currenTenant();
    const { config, data } = response;
    const { headers: reqHeaders } = config;
    const appContentSecurity = reqHeaders[headersKey.appContentSecurity];
    const { timeZone } = await assetSetts();
    const timestamp = new Date().toLocaleString('sv-SE', { timeZone });

    const userName = (await readCookieEncrypted(userNameCookieName)) || 'unknown';

    if (data?.data) {
      const { servJwePrivKey } = await servHttpSetts();
      const { code, message, datetime, metadata, data: cipherData } = data;

      try {
        let payload = cipherData;
        if (appContentSecurity === enc) {
          const secretJwe = await importPKCS8(servJwePrivKey, jwtAlgs.jweAlgRsa);
          payload = await decryptData(cipherData, secretJwe);
        }

        response.data = createResponseApi({ code, datetime, message, metadata, payload });
      } catch (error) {
        setLogger(
          'error',
          'RESPONSE',
          requestLogData(config.method, config.url, config.headers, response.data),
          timestamp,
          userName,
          data,
          tenant
        );
        response.status = 500;
        response.data = createResponseApi({
          code: '500.00.000',
          message: `servicesAxios Response (${(error as Error).message})`,
        });
      }
    }

    setLogger(
      'info',
      'RESPONSE',
      requestLogData(config.method, config.url, config.headers, response.data),
      `${config.baseURL}${config.url}`,
      timestamp,
      userName,
      response.data,
      tenant
    );

    return response;
  },
  (error) => {
    return createErrorResponseApi(error);
  }
);

export default servicesAxios;
