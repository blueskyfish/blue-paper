import { FileSystem, fromEnv } from '@blue-paper/server-commons';
import { FileInfo } from '@blue-paper/server-image-editor';
import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';

const UPLOAD_GROUP = 'UploadFactory';

function random(): string {
  return (Math.random() * 100000000).toFixed(0);
}

async function getFilename(tempPath: string, filename: string): Promise<string> {
  const tempFilename = join(tempPath, filename);
  const isExist = FileSystem.exists(tempFilename);

  if (isExist) {
    return `${random()}-${filename}`;
  }
  return filename;
}

/**
 * Configuration of the uploading files.
 *
 * @returns {MulterOptions}
 */
export function buildUploadConfiguration(): MulterOptions {

  const imageTemp = fromEnv('IMAGE_TEMP', '??').asString;
  if (imageTemp === '??') {
    throw new Error('Environment "IMAGE_TEMP" is required');
  }

  const acceptedMimetypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    // 'application/pdf',
  ];

  const storage = diskStorage({
    destination: imageTemp,
    filename: (req: Request, file: FileInfo, callback: (error: (Error | null), filename: string) => void) => {

      Logger.log(`File Name (filename=${file.originalname}, mimeType=${file.mimetype}, size=${file.size})`, UPLOAD_GROUP);

      getFilename(imageTemp, file.originalname)
        .then((filename) => callback(null, filename))
        .catch((error) => callback(error, null));
    }
  });

  Logger.log(`Storage (path=${imageTemp}, mimetypes=["${acceptedMimetypes.join('", "')}"])`, UPLOAD_GROUP);

  return {
    storage,
    preservePath: false,
    fileFilter: (req: any, file: FileInfo, callback: (error: (Error | null), acceptFile: boolean) => void) => {
      const accepted = acceptedMimetypes.includes(file.mimetype);
      Logger.log(`Accept File ("${accepted}": filename=${file.originalname}, mimeType=${file.mimetype}, size=${file.size})`, UPLOAD_GROUP);
      callback(null, accepted);
    }
  };
}
