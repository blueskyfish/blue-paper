import { LogService } from '@blue-paper/server-commons';
import * as sharp from 'sharp';
import { Sharp } from 'sharp';
import { IImageSize } from '../entities';

export class ImageProcessService {

  constructor(
    private log: LogService,
  ) {
  }

  async processFile(size: IImageSize, filename: string): Promise<Buffer> {
    return await this.processSharp(size, sharp(filename));
  }

  async processBuffer(size: IImageSize, buffer: Buffer): Promise<Buffer> {
    return this.processSharp(size, sharp(buffer));
  }

  private async processSharp(size: IImageSize, sharp: Sharp): Promise<Buffer> {
    return await sharp
      .resize({
        width: size.width,
        height: size.height
      })
      .toBuffer();
  }
}
