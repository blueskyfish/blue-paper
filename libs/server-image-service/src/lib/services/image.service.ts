import { FileSystem, LogService, timeStop } from '@blue-paper/server-commons';
import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import { BlogImageParams, PageImageParams } from '../image-params';
import { ImageConfig } from '../server-image-service.config';
import { IImageSize, ImageSizes } from './image-size';

/**
 * Image generator
 */
@Injectable()
export class ImageService implements OnApplicationBootstrap {

  /**
   * The image sizes
   *
   * @type {ImageSizes}
   * @private
   */
  private sizes: ImageSizes = {};

  constructor(
    private log: LogService,
    private config: ImageConfig
  ) {
  }

  async getPageImage(image: PageImageParams): Promise<Buffer> {
    const stopper = timeStop();
    try {
      const filename = join(this.config.imagePath, image.pageId, image.filename);
      const isExist = await FileSystem.exists(filename);
      if (!isExist) {
        throw new NotFoundException(`Not found (${image.pageId}/${image.size}/${image.filename})`);
      }

      const size: IImageSize = this.sizes[image.size];

      return await sharp(filename)
        .resize({
          height: size.height,
          width: size.width
        })
        .toBuffer();

    } finally {
      this.log.debug('Image', `Page Image time ${stopper.duration()} ms`);
    }
  }

  async getBlogImage(image: BlogImageParams): Promise<Buffer> {
    const stopper = timeStop();
    try {
      const filename = join(this.config.imagePath, image.themeId, image.blogId, image.filename);
      const isExist = await FileSystem.exists(filename);
      if (!isExist) {
        throw new NotFoundException(`Not found (${image.blogId}/${image.blogId}/${image.size}/${image.filename})`);
      }

      const size: IImageSize = this.sizes[image.size];

      return await sharp(filename)
        .resize({
          height: size.height,
          width: size.width
        })
        .toBuffer();

    } finally {
      this.log.debug('Image', `Blog Image time ${stopper.duration()} ms`);
    }

  }


  async onApplicationBootstrap(): Promise<any> {
    await this.loadImageSizes();
  }

  private async loadImageSizes(): Promise<void> {

    const sizesFilename = join(this.config.imagePath, 'sizes.json');

    this.sizes = await FileSystem.exists(sizesFilename)
      .then((isExist: boolean) => {
        if (!isExist) {
          this.log.error('Image', `Image Sizes not found on file "${sizesFilename})`)
          return {}
        }
        return FileSystem.readJson<ImageSizes>(sizesFilename);
      });

    this.log.info('Image', `Image Sizes => ${JSON.stringify(this.sizes)}`);
  }
}
