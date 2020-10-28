
import { isNil, isString } from '@blue-paper/shared-commons';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);
const asyncStat = util.promisify(fs.stat);
const asyncMkDir = util.promisify(fs.mkdir);
const asyncCopyFile = util.promisify(fs.copyFile);
const asyncMoveFile = util.promisify(fs.rename);

export const FILE_GROUP = 'File';

/**
 * The default encoding for file reading and writing
 */
export const ENCODING_UTF8 = 'utf8';

export const ENCODING_HEX = 'hex';

export const ENCODING_BASE64 = 'base64';

export const ENCODING_BINARY = 'binary';

/**
 * Helper class for file system operations of read, write and checking
 */
export class FileSystem {

  static async readFile(pathname: string, encoding: string = ENCODING_UTF8): Promise<string> {
    try {
    return await asyncReadFile(pathname, {encoding});
    } catch (e) {
      Logger.error(`Read file "${pathname}" is failed => ${e.message}`, null, FILE_GROUP);
      throw e;
    }
  }

  static async writeFile<T>(pathname: string, data: T, encoding: string = ENCODING_UTF8): Promise<void> {

    let content: string;
    if (!isString(data)) {
      content = JSON.stringify(data, null, 2);
    } else {
      content = `${data}`;
    }

    await asyncWriteFile(pathname, content, {encoding});
  }

  static async writeBuffer(pathname: string, buffer: Buffer): Promise<boolean> {
    if (Buffer.isBuffer(buffer) && buffer.length > 0) {
      try {
        await asyncWriteFile(pathname, buffer, 'binary');
        return true;
      } catch (e) {
        Logger.error(`Write Buffer to "${pathname} is failed => ${e.message}`, null, FILE_GROUP);
        return false;
      }
    }
    return false;
  }

  static async readBuffer(pathname: string): Promise<Buffer> {
    const data = await asyncReadFile(pathname, 'binary');
    if (!Buffer.isBuffer(data)) {
      return Buffer.from(data);
    }
    return data;
  }

  static async readJson<T>(pathname: string): Promise<T> {
    try {
      const text = await FileSystem.readFile(pathname);
      return JSON.parse(text);
    } catch (e) {
      Logger.error(`Parse file "${pathname}" is failed => ${e.message}`, null, FILE_GROUP);
      throw e;
    }
  }

  static async stats(pathname: string, showError?: boolean): Promise<fs.Stats> {
    try {
      return await asyncStat(pathname);
    } catch (e) {
      if (isNil(showError) || showError === true) {
        Logger.error(`Stats of "${pathname}" is failed => ${e.message}`, null, FILE_GROUP);
      }
      return null;
    }
  }

  static async isDirectory(pathname: string): Promise<boolean> {
    const stats = await FileSystem.stats(pathname, false);
    return !isNil(stats) && stats.isDirectory();
  }

  static async isFile(pathname: string): Promise<boolean> {
    const stats = await FileSystem.stats(pathname, false);
    return !isNil(stats) && stats.isFile();
  }

  static async exists(pathname: string): Promise<boolean> {
    const stats = await FileSystem.stats(pathname, false);
    return !isNil(stats);
  }

  static async mkdir(path: string): Promise<boolean> {
    try {
      await asyncMkDir(path, { recursive: true });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async copyFile(src: string, dest: string): Promise<boolean> {
    try {
      await asyncCopyFile(src, dest);
      return true;
    } catch (e) {
      Logger.error(`Copy File ${src} is failed (${e.message}) => ${dest}`);
      return false;
    }
  }

  static async moveFile(src: string, dest: string): Promise<boolean> {
    try {
      await asyncMoveFile(src, dest);
      return true;
    } catch (e) {
      Logger.error(`Move File is failed (${e.message})`);
      return false;
    }
  }
}
