import { isNil } from '@blue-paper/shared-commons';
import { Injectable } from '@nestjs/common';
import { createHash } from "crypto";
import { IAuthUser } from '../entities';
import { CryptoService } from './crypto.service';

@Injectable()
export class AuthenticationService {

  private readonly ENCODING = 'utf16le';
  private readonly ALGORITHM = 'sha256';
  private readonly OUTPUT = 'hex';


  constructor(private crypto: CryptoService) {
  }

  /**
   * Verify the user password with the incoming password together with the salt
   *
   * @param {string} salt
   * @param {string} password
   * @param {string} userPassword
   * @returns {boolean}
   */
  checkPassword(salt: string, password: string, userPassword: string): boolean {
    if (isNil(salt) || isNil(userPassword)) {
      return false;
    }

    if (salt === '-' && userPassword.startsWith('-')) {
      // plain password
      return password === userPassword.substring(1);
    }

    const tempPassword = this.hash(salt, password);
    return tempPassword === userPassword;
  }

  generateToken(user: IAuthUser): string {
    const text = JSON.stringify(user);
    return this.crypto.encrypt(text);
  }

  parseToken(token: string): IAuthUser {
    return this.crypto.decryptJson<IAuthUser>(token);
  }

  /**
   * Create from the password with the salt and return the hash value
   *
   * @param {string} salt the salt
   * @param {string} password the password
   * @returns {string} the hash value
   */
  private hash(salt: string, password: string): string {
    const hash = createHash(this.ALGORITHM);
    return hash
      .update(Buffer.from(salt, this.ENCODING))
      .update(Buffer.from(password, this.ENCODING))
      .digest(this.OUTPUT);
  }

}
