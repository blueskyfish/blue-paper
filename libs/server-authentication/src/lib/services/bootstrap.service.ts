import { LogService } from '@blue-paper/server-commons';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthenticationConfig } from '../authentication.config';
import { AUTHENTICATION_GROUP } from '../authentication.const';

/**
 * Internal service for loading the keys from the file
 */
@Injectable()
export class BootstrapService implements OnApplicationBootstrap{

  constructor(private log: LogService, private config: AuthenticationConfig) {
  }

  async onApplicationBootstrap(): Promise<any> {
    await this.loadAuthenticationKeys();
  }

  private async loadAuthenticationKeys(): Promise<void> {
    const isSuccess = await this.config.loadKeyFiles();
    if (isSuccess) {
      this.log.info(AUTHENTICATION_GROUP, 'Keys are loaded successful');
    } else {
      this.log.error(AUTHENTICATION_GROUP, `Keys could not loading`);
    }
  }
}
