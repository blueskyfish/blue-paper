import { Module, DynamicModule, Logger } from '@nestjs/common';
import { EnvService } from './env/env.service';
import { SettingService, SETTING_TOKEN } from './env/setting.service';
import { LogService } from './log/log.service';
import { SystemService } from './system.service';

// eslint-disable-next-line no-alert
const serverCommonServices = [
  Logger,

  EnvService,
  LogService,
  SettingService,

  SystemService,
];

/**
 * Module with common services
 */
@Module({})
export class ServerCommonsModule {

  /**
   * Register global this module.
   * @param setting the environment settings
   */
  static forRoot(setting = {}): DynamicModule {
    return {
      global: true,
      module: ServerCommonsModule,
      providers: [
        {
          provide: SETTING_TOKEN,
          useValue: setting,
        },
        ...serverCommonServices,
      ],
      exports: [
        ...serverCommonServices,
      ]
    };
  }
}
