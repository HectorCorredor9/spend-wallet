import { importPKCS8 } from 'jose';
// import { NextRequest } from 'next/server';
// Internal app
import { setLogger } from '@/utils/tools';
import { createResponseApi } from '../http';
import { readCookieEncrypted } from '@/utils';
import { HttpRequest, Tenant } from '@/interfaces';
import { appHttpSetts, assetSetts } from '@/tenants/tenantSettings';
import { apiPaths, jwtAlgs, headersKey, userNameCookieName } from '@/constans';
import { assembleJWS, verifySignature, decryptData, encryptData, signData, disassembleJWS, encode } from '@/security';
/**
 * Creates an Axios instance with predefined configuration for making HTTP requests.
 */
export async function applicationRequest(httpRequest: HttpRequest) {
  const { method, pathUrl, httpConfig, ...dataReq } = httpRequest;
  const { headers /*timeout*/ } = httpConfig;
  const tenant = headers[headersKey.appTenant] as Tenant;
  const { timeZone } = await assetSetts();
  const timestamp = new Date().toLocaleString('sv-SE', { timeZone });
  let { dataRequest } = dataReq;

  const { secJweStr, secJwsStr, webJwePrivKey, webJwsPrivKey, webUrl } = await appHttpSetts(tenant);
  const userName = (await readCookieEncrypted(userNameCookieName)) || 'unknown';
  const url = `${webUrl}${apiPaths.appAPiV1}${pathUrl}`;

  if (dataRequest?.payload) {
    try {
      const payload = dataRequest.payload as string;
      const tokenApp = headers['X-Token'] || headers['x-token'] || headers[headersKey.appJwsToken];
      const signedData = assembleJWS(tokenApp, payload);
      const secretJws = encode(secJwsStr);
      const signatureVerified = await verifySignature(signedData, secretJws);
      const secretJwe = await importPKCS8(webJwePrivKey, jwtAlgs.jweAlgRsa);
      const decrypt = await decryptData(signatureVerified, secretJwe);

      if (pathUrl !== apiPaths.appApiServ) {
        dataRequest = decrypt;
      } else {
        dataRequest.payload = decrypt;
      }
    } catch (error) {
      setLogger('error', 'REQUEST', httpRequest, url, timestamp, userName);
      throw new Error(`application Request (${(error as Error).message})`);
    }
  }

  const body = dataRequest ? JSON.stringify(dataRequest) : dataRequest;

  if (pathUrl !== apiPaths.appApiServ) {
    setLogger('info', 'REQUEST', httpRequest, url, timestamp, userName, body);
  }

  let response;
  try {
    const fetchInstance = {
      method: method.toUpperCase(),
      headers: headers,
      body,
    };
    response = await fetch(url, fetchInstance);
  } catch (fetchError) {
    throw new Error(`Fetch failed: ${(fetchError as Error).message}`);
  }

  const { status } = response;
  let data = await response.json();

  const requestData = {
    pathUrl,
    method,
    httpConfig: {
      timeout: 0,
      headers: Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, String(v)])),
      validateStatus: () => true,
      withCredentials: false,
    },
  };

  if (pathUrl !== apiPaths.appApiServ) {
    setLogger('info', 'RESPONSE', requestData, url, timestamp, userName, data);
  }

  try {
    if (data?.payload) {
      let { payload } = data;
      const secretJwe = encode(secJweStr);
      payload = await encryptData(payload, secretJwe, jwtAlgs.jweAlgSec);
      const secretJws = await importPKCS8(webJwsPrivKey, jwtAlgs.jwsAlgRsa);
      const signedData = await signData(payload, secretJws, jwtAlgs.jwsAlgRsa);
      const authJws = disassembleJWS(signedData);

      data = createResponseApi({ ...data, payload, authJws });
    }
  } catch (error) {
    setLogger('error', 'RESPONSE', requestData, url, timestamp, userName, data, tenant);
    throw new Error(`application Response (${(error as Error).message})`);
  }

  return { data, status };
}
