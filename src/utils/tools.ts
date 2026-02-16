import * as yup from 'yup';
//Internal app
import { Field, ValidationShape, HttpRequest } from '@/interfaces';
// import { servTransportKey } from '@/tenants/tenantSettings';
import { settings as tebcaConfig } from '@/tenants/tebca/config';

/**
 * Gets the corresponding image for a specific tenant.
 *
 * @param {string} tenant - The name of the tenant.
 * @param {string} file - The name of the image file.
 * @returns {any} The required image.
 *
 * @example
 * const image = getImages('tebca', 'logo.png');
 * console.log(image.default.src);
 */
export function getImages(tenant: string, file: string) {
  let validateImage;

  try {
    validateImage = require(`%/images/${tenant}/${file}`);
  } catch {
    validateImage = require(`%/images/tebca/${file}`);
  }

  return validateImage;
}

/**
 * Handles the configuration of a specific tenant.
 *
 * @param {string} tenant - The name of the tenant.
 * @returns {object} The combined configuration of the tenant.
 *
 * @example
 * const config = handleConfigTenant('tebca');
 * console.log(config);
 */
export const handleConfigTenant = (tenant: string | undefined) => {
  let getModuleConfig;

  try {
    getModuleConfig = require(`@/tenants/${tenant}/config`);
  } catch {
    getModuleConfig = require('@/tenants/tebca/config');
  }

  return { ...tebcaConfig, ...getModuleConfig.config };
};

/**
 * Applies exclusions to a yup schema by removing specified tests.
 *
 * @param {any} rule - The yup schema rule to modify.
 * @param {string[]} excludeTests - Array of test names to exclude.
 * @returns {any} The modified yup schema rule.
 */
function applyExclusions(rule: any, excludeTests: string[]): any {
  if (!rule || !rule.tests) {
    return rule;
  }

  // Clone the rule to avoid modifying the original
  const newRule = rule.clone();

  // Filter out the excluded tests
  newRule.tests = newRule.tests.filter((test: any) => {
    return !excludeTests.includes(test.OPTIONS?.name);
  });

  return newRule;
}

/**
 * Gets the validation schema for a set of fields and a specific tenant.
 *
 * @param {Field[]} fields - The fields for which the validation schema is needed.
 * @param {string} tenant - The name of the tenant.
 * @param {Object} options - Optional configuration for validation rules.
 * @param {string[]} options.excludeTests - Array of test names to exclude from validation.
 * @returns {yup.ObjectSchema<any>} The generated validation schema.
 *
 * @example
 * const schema = getSchema([{ name: 'email', type: 'string' }], 'tebca');
 * schema.validate({ email: 'test@example.com' }).then(() => {
 *   console.log('Validation successful');
 * }).catch((err) => {
 *   console.log('Validation error:', err);
 * });
 *
 * // To exclude specific validations:
 * const cashSchema = getSchema(['amount'], 'tebca', { excludeTests: ['amount-format'] });
 */
export const getSchema = (
  fields: Field[],
  tenant: string,
  options?: { excludeTests?: string[] },
): yup.ObjectSchema<any> => {
  const validationRulesTenant = (() => {
    let getModule;
    try {
      getModule = require(`@/tenants/${tenant}/validationRules`);
    } catch {
      getModule = require('@/tenants/tebca/validationRules');
    }
    return getModule.validationRules;
  })();

  const shape = fields.reduce<ValidationShape>((acc, field) => {
    if (typeof field === 'string') {
      let rule = validationRulesTenant[field];

      // Apply exclusions if specified for this field
      if (options?.excludeTests) {
        rule = applyExclusions(rule, options.excludeTests);
      }

      acc[field] = rule;
    } else if (typeof field === 'object') {
      const key = Object.keys(field)[0];
      const subFields = field[key];
      acc[key] = yup.array().of(
        yup.object().shape(
          subFields.reduce<ValidationShape>((subAcc: any, subField: any) => {
            let rule = validationRulesTenant[subField];

            // Apply exclusions if specified for this subfield
            if (options?.excludeTests) {
              rule = applyExclusions(rule, options.excludeTests);
            }

            subAcc[subField] = rule;
            return subAcc;
          }, {}),
        ),
      );
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};

/**
 * Sets data in Redis.
 *
 * @param {string} method - The HTTP method to use (e.g., "GET", "PUT").
 * @param {object} payload - The payload to send to Redis.
 * @param {string | null} payload.uuid - The UUID for the Redis entry. If null, a new UUID will be generated.
 * @param {object} payload.data - The data to store in Redis.
 * @param {object} payload.data.collect - The data to be collected and stored.
 *
 * @returns {Promise<void>} A promise that resolves when the data has been set in Redis.
 *
 * @example
 * const payload = {
 *   uuid: null,
 *   data: {
 *     tenant: { key: 'value' }
 *   }
 * };
 * await setDataRedis('PUT', payload);
 */
export const setDataRedis = async (method: string, data = {}): Promise<void> => {
  try {
    const encryptData = JSON.stringify(data);
    const url = `${process.env.NEXT_PUBLIC_WEB_URL}/api/redis`;

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: encryptData }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error setting data in Redis:', error);
    throw error;
  }
};

/**
 * Formats a time in seconds to a string in MM:SS format.
 *
 * @param {number} time - The time in seconds to format.
 * @returns {string} The formatted time in MM:SS format.
 *
 * @example
 * const formattedTime = formatTime(125); // "02:05"
 * console.log(formattedTime); // Prints "02:05"
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Extracts the last segment of a given path.
 *
 * @param {string} path - The path from which to extract the last segment.
 * @returns {string} The last segment of the path.
 *
 * @example
 * const segment = lastPath('/user/profile/settings');
 * console.log(segment); // Prints "settings"
 */
export const lastPath = (path: string): string => {
  const currentPath = path.split('/').filter(Boolean);

  const lastPath = currentPath[currentPath.length - 1];

  return lastPath;
};

/**
 * Copies the provided data to the clipboard.
 *
 * @param {string} data - The data to be copied to the clipboard.
 *
 * @example
 * copyToClipboard('123456789');
 * // Logs: "Account number copied to clipboard 123456789"
 */
export const copyToClipboard = (data: string) => {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      console.info(`Account number copied to clipboard ${data}`);
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};

/**
 * Encodes a string to base64 (utf-8 safe)
 * @param {string} value - The value to encode
 * @returns {string} The base64 encoded string
 */
export function encodeBase64(value: string): string {
  return Buffer.from(value, 'utf-8').toString('base64');
}

/**
 * Decodes a string from base64 (utf-8 safe)
 * @param {string} value - The base64 string
 * @returns {string} The decoded string
 */
export function decodeBase64(value: string): string {
  return Buffer.from(value, 'base64').toString('utf-8');
}

/** Logs HTTP request and response details in a standardized format.
 *
 * @param {string} type - The type of log (e.g., 'REQUEST', 'RESPONSE').
 * @param {string} event - The event description.
 * @param {HttpRequest} httpRequest - The HTTP request object containing method, pathUrl, headers, and data.
 * @param {string} url - The full URL of the request.
 * @param {string} timestamp - The timestamp of the log entry.
 * @param {string} [userName='unknown'] - The username associated with the request.
 * @param {any} [data] - Optional additional data to log (e.g., response data).
 * @param {string} [tenant] - Optional tenant identifier.
 */

export function setLogger(
  type: string,
  event: string,
  httpRequest: HttpRequest,
  url: string,
  timestamp: string,
  userName: string = 'unknown',
  data?: any,
  tenant?: string,
) {
  const {
    method,
    pathUrl,
    httpConfig: { headers },
    ...dataReq
  } = httpRequest;

  const { dataRequest } = dataReq;

  console.log(
    `${process.env.WEB_ENV?.toUpperCase()}:${type} - ${userName} - ${timestamp} - ${event} ${pathUrl.replace(
      /^\//,
      '',
    )} -->`,
    JSON.stringify({
      client: headers['app-tenant'] || tenant || 'unknown',
      method: method.toUpperCase() || 'UNKNOWN',
      headers,
      url,
      data: data ?? dataRequest,
    }),
  );
}
