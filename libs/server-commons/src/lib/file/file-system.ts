
import { isNil, isString } from '@blue-paper/shared-commons';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { type } from 'os';
import * as util from 'util';

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);
const asyncStat = util.promisify(fs.stat);

export const FILE_GROUP = 'File';

/**
 * The default encoding for file reading and writting
 */
export const UTF_8 = 'utf8';

/**
 * Helper class for file system operations of read, write and checking
 */
export class FileSystem {

  static async readFile(pathname: string, encoding: string = UTF_8): Promise<string> {
    try {
    return await asyncReadFile(pathname, {encoding});
    } catch (e) {
      Logger.error(`Read file "${pathname}" is failed => ${e.message}`, null, FILE_GROUP);
      throw e;
    }
  }

  static async writeFile<T>(pathname: string, data: T, encoding: string = UTF_8): Promise<void> {

    let content: string;
    if (!isString(data)) {
      content = JSON.stringify(data, null, 2);
    } else {
      content = `${data}`;
    }

    await asyncWriteFile(pathname, content, {encoding});
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
}
