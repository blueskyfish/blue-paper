import { join } from 'path';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { fromEnv } from '@blue-paper/server-commons';
import { Logger } from '@nestjs/common';

/**
 * Group name of bootstrap
 */
export const BOOTSTRAP_GROUP = 'Bootstrap';

export const APP_HOME = fromEnv('background_home', process.cwd()).asString;

/**
 * The path to the theme
 */
export const THEME_PATH = fromEnv('background_theme', '-').asString;

export function buildStaticConfig(): ServeStaticModuleOptions[] {
  Logger.log(`App Home Path => "${THEME_PATH}"`, BOOTSTRAP_GROUP);
  return [
    {
      rootPath: join(THEME_PATH, 'assets'),
      serveRoot: '/assets',
    }
  ];
}
