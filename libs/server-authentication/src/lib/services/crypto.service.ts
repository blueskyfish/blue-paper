import { ENCODING_HEX, ENCODING_UTF8 } from '@blue-paper/server-commons';
import { Injectable, Logger } from '@nestjs/common';
import { privateEncrypt, publicDecrypt } from 'crypto';
import { AuthenticationConfig } from '../authentication.config';
import { AUTHENTICATION_GROUP } from '../authentication.const';

/**
 * The crypto service encrypt and decrypt string with the public- and private key.
 */
@Injectable()
export class CryptoService {

  constructor(private config: AuthenticationConfig) {
  }

  /**
   * Encrypt the given value with the private key and returns as `hex` string.
   *
   * @param {string} value the value
   * @returns {string} the `hex` string
   */
  encrypt(value: string): string {
    const buffered = Buffer.from(value, ENCODING_UTF8);
    return privateEncrypt(this.config.privateKey, buffered).toString(ENCODING_HEX);
  }

  encryptJson<T>(data: T): string {
    const value = JSON.stringify(data);
    return this.encrypt(value);
  }

  /**
   * Decrypt the given `hex` value with the public key and returns the plain text.
   *
   * @param {string} value
   * @returns {string}
   */
  decrypt(value: string): string {
    const buffered = Buffer.from(value, ENCODING_HEX);
    return publicDecrypt(this.config.publicKey, buffered).toString(ENCODING_UTF8);
  }

  /**
   * Decrypt the given `hex` value with the public key and parse string to an JSON object.
   *
   * @param {string} value the encrypted `hex` string,
   * @returns {T} the JSON entity or null
   */
  decryptJson<T>(value: string): T {
    try {
      const data = this.decrypt(value);
      return JSON.parse(data);
    } catch (e) {
      Logger.error(`Decrypt to JSON is failed (${e.message})`, e.static, AUTHENTICATION_GROUP);
      return null;
    }
  }
}
