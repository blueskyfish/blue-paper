import { join } from 'path';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { fromEnv } from '@blue-paper/server-commons';
import { Logger } from '@nestjs/common';

/**
 * Group name of bootstrap
 */
export const BOOTSTRAP_GROUP = 'Bottstrap';

export const APP_HOME = fromEnv('background_home', process.cwd()).asString;

export function buildStaticConfig(): ServeStaticModuleOptions[] {
  Logger.log(`App Home Path => "${APP_HOME}"`, BOOTSTRAP_GROUP);

  return [
    {
      rootPath: join(APP_HOME, 'data', 'assets'),
      serveRoot: '/assets',
    }
  ];
}
