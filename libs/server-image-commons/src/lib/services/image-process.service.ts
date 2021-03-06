import { FileSystem, LogService } from '@blue-paper/server-commons';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as sharp from 'sharp';
import { Sharp } from 'sharp';
import { ImageSizeValue } from '../entities';

@Injectable()
export class ImageProcessService {

  constructor(private log: LogService) {
  }

  /**
   * Process the image with the given size. If the file is not found, an exception it thrown.
   *
   * @param {ImageSizeValue} size the size dimension
   * @param {string} filename the filename
   * @returns {Promise<Buffer>} the buffer of the image
   * @throws NotFoundException
   */
  async processFile(size: ImageSizeValue, filename: string): Promise<Buffer> {
    const isExist = await FileSystem.exists(filename);
    if (!isExist) {
      this.log.error('ImageProcess', `not found image => ${filename}`);
      throw new NotFoundException(`ImageProcess: File not found => ${filename}`);
    }
    return await this.processSharp(size, sharp(filename));
  }

  async processBuffer(size: ImageSizeValue, buffer: Buffer): Promise<Buffer> {
    return this.processSharp(size, sharp(buffer));
  }

  private async processSharp(size: ImageSizeValue, sharp: Sharp): Promise<Buffer> {
    return await sharp
      .resize({
        width: size.width,
        height: size.height
      })
      .toBuffer();
  }
}
