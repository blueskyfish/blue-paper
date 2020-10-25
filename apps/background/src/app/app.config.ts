import { fromEnv } from '@blue-paper/server-commons';
import { IDbConfig } from '@blue-paper/server-database';
import { IImageConfig } from '@blue-paper/server-image-service';
import { IImageUploadConfig } from '@blue-paper/server-image-upload';
import { Logger } from '@nestjs/common';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { join } from 'path';

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


export function buildImageConfig(): IImageConfig {
  const imagePath = fromEnv('IMAGE_PATH', '??').asString;
  if (imagePath === '??') {
    throw new Error('Environment "IMAGE_PATH" is required');
  }

  const imageCache = fromEnv('IMAGE_CACHE', '??').asString;
  if (imageCache === '??') {
    throw new Error('Environment "IMAGE_CACHE" is required');
  }

  return {
    imagePath,
    imageCache,
  };
}

export function buildImageUploadConfig(): IImageUploadConfig {
  const imagePath = fromEnv('IMAGE_PATH', '??').asString;
  if (imagePath === '??') {
    throw new Error('Environment "IMAGE_PATH" is required');
  }

  const imageTemp = fromEnv('IMAGE_PATH', '??').asString;
  if (imageTemp === '??') {
    throw new Error('Environment "IMAGE_TEMP" is required');
  }

  return {
    imagePath,
    imageTemp,
    acceptedMimetypes: [
      'image/jpeg',
      'image/png',
      // 'application/pdf',
    ]
  };
}
