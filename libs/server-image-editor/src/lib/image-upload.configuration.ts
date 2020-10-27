import { FileSystem } from '@blue-paper/server-commons';
import { FileInfo } from './entities/file-info';
import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';

function random(): string {
  return (Math.random() * 100000000).toFixed(0);
}

async function getFilename(tempPath: string, filename: string): Promise<string> {
  const tempFilename = path.join(tempPath, filename);
  const isExist = FileSystem.exists(tempFilename);

  if (isExist) {
    return `${random()}-${filename}`;
  }
  return filename;
}

/**
 * Configuration of the uploading files.
 *
 * **NOTE**: Should be private and not published
 *
 * @param {string} tempPath
 * @param {string[]} acceptedMimetypes the mimetypes for accepting.
 * @returns {MulterOptions}
 */
export function buildConfiguration(tempPath: string, acceptedMimetypes: string[]): MulterOptions {

  const storage = diskStorage({
    destination: tempPath,
    filename: (req: Request, file: FileInfo, callback: (error: (Error | null), filename: string) => void) => {

      Logger.debug(`File Name (filename=${file.originalname}, mimeType=${file.mimetype}, size=${file.size})`, 'Upload');

      getFilename(tempPath, file.originalname)
        .then((filename) => callback(null, filename))
        .catch((error) => callback(error, null));
    }
  })

  return {
    storage,
    preservePath: false,
    fileFilter: (req: any, file: FileInfo, callback: (error: (Error | null), acceptFile: boolean) => void) => {
      Logger.debug(`Accept File (filename=${file.originalname}, mimeType=${file.mimetype}, size=${file.size})`, 'Upload');
      const accepted = acceptedMimetypes.includes(file.mimetype);
      callback(null, accepted);
    }
  }
}
