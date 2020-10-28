import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemService {

  /**
   * Say hello to the requester
   *
   * @param {string} [name] the optional name
   * @returns {{message: string}}
   */
  getHello(name?: string): { message: string } {
    return {
      message: `Hello ${name || 'World'}!`
    };
  }
}
