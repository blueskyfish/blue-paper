import { IAuthenticationConfig } from '@blue-paper/server-authentication';
import { fromEnv } from '@blue-paper/server-commons';
import { IDbConfig } from '@blue-paper/server-database';
import { IImageFileConfig } from '@blue-paper/server-image-commons';
import { IImageUploadConfig } from '@blue-paper/server-image-editor';

export const BOOTSTRAP_GROUP = 'Bootstrap';

export function buildAuthenticationConfig(): IAuthenticationConfig {

  const privateKeyFile = fromEnv('FILE_PRIVATE_KEY', '??').asString;
  if (privateKeyFile === '??') {
    throw new Error('Environment "FILE_PRIVATE_KEY" is required');
  }
  const publicKeyFile = fromEnv('FILE_PUBLIC_KEY', '??').asString;
  if (publicKeyFile === '??') {
    throw new Error('Environment "FILE_PUBLIC_KEY" is required');
  }

  return {
    publicKeyFile,
    privateKeyFile,
  }
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

export function buildImageFileConfig(): IImageFileConfig {
  const imagePath = fromEnv('IMAGE_PATH', '??').asString;
  if (imagePath === '??') {
    throw new Error('Environment "IMAGE_PATH" is required');
  }

  const imageCache = fromEnv('IMAGE_CACHE', '??').asString;
  if (imageCache === '??') {
    throw new Error('Environment "IMAGE_CACHE" is required');
  }

  const imageTemp = fromEnv('IMAGE_TEMP', '??').asString;
  if (imageTemp === '??') {
    throw new Error('Environment "IMAGE_TEMP" is required');
  }

  return {
    imagePath,
    imageCache,
    imageTemp,
  }
}

export function buildImageEditorConfig(): IImageUploadConfig {

  const imageTemp = fromEnv('IMAGE_TEMP', '??').asString;
  if (imageTemp === '??') {
    throw new Error('Environment "IMAGE_TEMP" is required');
  }

  return {
    imageTemp,
    acceptedMimetypes: [
      'image/jpeg',
      'image/png',
      // 'application/pdf',
    ]
  };
}
