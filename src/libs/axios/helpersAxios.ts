import { isAxiosError } from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
// Internal app
import { httpSchemas } from '@/schemas';
import { createHttpConfig } from '../http';
import { browserAxios, servicesAxios } from './';
import { apiPaths, apiSrc, cipherBack } from '@/constans';
import { appCredSetts, servBackUrl } from '@/tenants/tenantSettings';
import type { ErrorResponseApi, HttpRequest, RequestType } from '@/interfaces';

/**
 * Manages an HTTP request.
 *
 * @param {RequestContent} httpRequest - The content of the request.
 * @param {RequestType} requestType - The type of the request.
 * @returns {Promise<AxiosResponse>} The response from the Axios request.
 * @throws Will throw an error if the request content is invalid.
 */
export async function manageRequest(httpRequest: HttpRequest, requestType: RequestType): Promise<AxiosResponse> {
  const parsedReqContent = httpSchemas.httpRequest.safeParse(httpRequest);
  let httpConfig = createHttpConfig();

  if (!parsedReqContent.success) {
    throw new Error(`Invalid ${requestType} Request: ${JSON.stringify(parsedReqContent.error)}`);
  }

  const { method, pathUrl, dataRequest } = parsedReqContent.data;
  httpConfig = parsedReqContent.data.httpConfig ?? httpConfig;

  const axiosInstance = createAxiosInstance(requestType);
  const response = await axiosInstance({ url: `${pathUrl}`, method, data: dataRequest, ...httpConfig });

  return response;
}

/**
 * Creates an Axios instance with the given configuration.
 *
 * @param {RequestType} requestType - The type of the request.
 * @returns {AxiosInstance} The Axios instance.
 */
function createAxiosInstance(requestType: RequestType): AxiosInstance {
  const axiostInstance = {
    browser: browserAxios,
    services: servicesAxios,
  };

  return axiostInstance[requestType];
}

/**
 * Create an error response object.
 *
 * @param {AxiosError | Error} error - The error api response.
 * @returns {AxiosResponse | ErrorResponseApi} The error response object.
 */
export function createErrorResponseApi(error: AxiosError | Error): AxiosResponse | ErrorResponseApi {
  if (isAxiosError(error) && error.response) {
    error.response.data = { code: `${error.status}.00.000`, message: error.message };

    return error.response;
  }

  const errorResponse = { code: '500.00.000', message: error.message };

  return {
    status: 500,
    data: errorResponse,
  };
}

/**
 * Constructs the URL for service requests.
 * @param {string} uri - The URI to be used in the request.
 * @param {string} tenantId - The tenant ID for the request.
 * @returns {Promise<{ baseURL: string, uri: string, tenantId: string, security: string }>} The constructed URL and related parameters.
 */
export async function servicesUrl(uri: string, tenantId: string) {
  const { enc, dnc } = cipherBack;
  const { cardsSolutionUrl, servUrl, accountsSolutionUrl } = await servBackUrl();
  const { tenantIdDirect } = await appCredSetts();
  const { cardsSolDirect, accountsApiDirect } = apiPaths;
  let baseURL = servUrl;
  let security = `${enc}`;
  tenantId = uri.includes('direct') ? tenantIdDirect : tenantId;

  if (uri.includes(cardsSolDirect)) {
    uri = uri.replace(`${apiSrc}/v1/direct/cards`, '/v1');
    baseURL = cardsSolutionUrl;
    security = `${dnc}`;
  }

  if (uri.includes(accountsApiDirect)) {
    uri = uri.replace(`${apiSrc}/v1/direct/accounts`, '/v1/accounts');
    baseURL = accountsSolutionUrl;
    security = `${dnc}`;
  }

  return { baseURL, uri, tenantId, security };
}
