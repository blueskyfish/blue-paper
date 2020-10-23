import { IDbConfig } from '@blue-paper/server-database';
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

export function buildDatabaseConfig(): IDbConfig {
  return {
    host: fromEnv('DB_HOST', 'localhost').asString,
    port: fromEnv('DB_PORT', '3306').asNumber,
    user: fromEnv('DB_USER', 'dummy').asString,
    database: fromEnv('DB_DATABASE', 'paper').asString,
    password: fromEnv('DB_PASSWORD', '??').asString,
    // TODO more settings for database
  };
}
