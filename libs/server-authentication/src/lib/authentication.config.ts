import { FileSystem } from '@blue-paper/server-commons';
import { isNil } from '@blue-paper/shared-commons';
import { Logger } from '@nestjs/common';
import { AUTHENTICATION_GROUP } from './authentication.const';

export interface IAuthenticationConfig {

  /**
   * The filename of the private key
   */
  privateKeyFile: string;

  /**
   * The filename of the public key
   */
  publicKeyFile: string;
}

export class AuthenticationConfig {

  private _privateKey: string;
  private _publicKey: string;

  get privateKey(): string {
    if (isNil(this._privateKey)) {
      throw new Error(`${AUTHENTICATION_GROUP}: Private Key is required`);
    }
    return this._privateKey;
  }

  get publicKey(): string {
    if (isNil(this._publicKey)) {
      throw new Error(`${AUTHENTICATION_GROUP}: Public Key is required`);
    }
    return this._publicKey;
  }

  get hasKeys(): boolean {
    return !isNil(this._privateKey) && !isNil(this._publicKey);
  }

  constructor(private config: IAuthenticationConfig) {
  }

  async loadKeyFiles(): Promise<boolean> {
    try {
      this._privateKey = await FileSystem.readFile(this.config.privateKeyFile);
      this._publicKey = await FileSystem.readFile(this.config.publicKeyFile);
      return true;
    } catch (e) {
      Logger.error(`Key reading is failed (${e.message}`, e.stack, AUTHENTICATION_GROUP);
      this._privateKey = null;
      this._publicKey = null;
      return false;
    }
  }
}
