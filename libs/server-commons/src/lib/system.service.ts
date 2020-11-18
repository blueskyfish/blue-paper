import { Injectable } from '@nestjs/common';
import { Hello } from './entities';

@Injectable()
export class SystemService {

  /**
   * Say hello to the requester
   *
   * @param {string} [name] the optional name
   * @returns {{message: string}}
   */
  getHello(name?: string): Hello {
    return {
      message: `Hello ${name || 'World'}!`
    };
  }
}
