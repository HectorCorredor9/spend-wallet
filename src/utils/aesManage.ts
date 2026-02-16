import forge from 'node-forge';
//Internal app
import { DecryptResult } from '@/interfaces';
import { servTransportKey } from '@/tenants/tenantSettings';

/**
 * Encrypts data using AES-CBC with a predefined key.
 *
 * @param {string} decryptData - The data to be encrypted.
 * @returns {string} The encrypted data in base64 format.
 *
 * @example
 * const encrypted = encryptForge('mySecretData');
 * console.log(encrypted); // Prints the encrypted data in base64 format
 */
export const encryptAES = async (decryptData: string, domain: string): Promise<string> => {
  const iv = new Uint8Array(16);

  const buffer = forge.util.createBuffer(iv, 'raw');

  const cipher = forge.cipher.createCipher('AES-CBC', await keyDomain(domain));

  cipher.start({ iv: buffer });

  cipher.update(forge.util.createBuffer(decryptData, 'utf8'));

  cipher.finish();

  const encryptedData = forge.util.encode64(cipher.output.getBytes());

  return encryptedData;
};

/**
 * decrypt data from AES256 in CBC mode, using forge library with a iv of 16 bytes null
 *
 * @param {string} encryptedData data to decrypt
 * @param {string} domain domain for key retrieval
 *
 * @returns {Promise<DecryptResult>} decryption result with success status and data
 */
export const decryptAES = async (encryptedData: string, domain: string): Promise<DecryptResult> => {
  try {
    const iv = new Uint8Array(16);
    const buffer = forge.util.createBuffer(iv, 'raw');

    const key = await keyDomain(domain);
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    const rawData = forge.util.decode64(encryptedData);

    decipher.start({ iv: buffer });
    decipher.update(forge.util.createBuffer(rawData, 'raw'));

    if (!decipher.finish()) {
      return { success: false, data: '-', error: `Decryption failed for domain: ${domain}` };
    }

    return { success: true, data: decipher.output.toString() };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      data: '-',
      error: `${errorMsg} (domain: ${domain})`,
    };
  }
};

/**
 * Retrieves the transport key associated with a given domain.
 *
 * @param domain - The domain for which to retrieve the transport key.
 *                 Accepted values are `'cards'` and `'accounts'`.
 * @returns A promise that resolves to the transport key string for the specified domain.
 * @throws {Error} If the provided domain is not valid.
 */
async function keyDomain(domain: string): Promise<string> {
  const { transportKeyCardSolutions, transportKeyAcccount } = await servTransportKey();

  const ENUM_DOMAIN: Record<string, string> = {
    cards: 'cards',
    accounts: 'accounts',
  };

  const domainKeyMap = {
    [ENUM_DOMAIN.cards]: transportKeyCardSolutions,
    [ENUM_DOMAIN.accounts]: transportKeyAcccount,
  };

  if (!(domain in domainKeyMap)) {
    throw new Error('Invalid domain for decryption');
  }

  return domainKeyMap[domain];
}
