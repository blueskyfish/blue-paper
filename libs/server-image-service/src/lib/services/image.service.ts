import { FileSystem, LogService } from '@blue-paper/server-commons';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { join } from 'path';
import { ImageConfig } from '../server-image-service.config';
import { ImageSizes } from './image-size';

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
