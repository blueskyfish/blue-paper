import { CryptoService } from '@blue-paper/server-authentication';
import { FileSystem, LogService } from '@blue-paper/server-commons';
import { createHash } from 'crypto';
import { IImageSize, ImageSizes } from '../entities';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { join } from "path";
import { ImageSizeName } from '../entities/image-size-name';
import { BuildImageUrl } from './entities';
import { ImageSettingService } from './image-setting.service';
import { v4 as uuidV4} from 'uuid';

export const DEFAULT_SIZE: IImageSize = Object.freeze({
  width: 64,
  height: 64
});

/**
 * Manages the list of image sizes that mapping to names and filename of image
 */
@Injectable()
export class ImageFileService implements OnApplicationBootstrap {

  private sizes: ImageSizes

  constructor(
    private log: LogService,
    private config: ImageSettingService,
    private cryptoService: CryptoService,
  ) {
  }

  getSizeFrom(name: ImageSizeName): IImageSize {
    return this.sizes[name] || DEFAULT_SIZE;
  }

  adjustFilename(filename: string): string {
    return filename
      .replace(/[ _(),!?+]/, '-')
      .toLowerCase();
  }

  createBase64(mimetype: string, buffer: Buffer): string {
    return `data:${mimetype};base64,${buffer.toString('base64')}`;
  }

  createEtag(buffer: Buffer | string): string {
    const hash = createHash('sha256').update(buffer).digest('hex');
    return `${uuidV4()}-${hash}`;
  }

  /**
   * Build form the given parameter an encrypted image url.
   *
   * @param{BuildImageUrl} data the build image entity
   * @returns {string}
   */
  buildImageUrl(data: BuildImageUrl): string {
    const ext = this.getFileExtension(data.mimetype);
    const imagePart = this.cryptoService.encryptJson(data);
    return `/images/${imagePart}.${ext}`;
  }

  getFileExtension(mimetype: string): string {
    switch (mimetype) {
      case 'image/png':
        return 'png';
      case 'image/jpeg':
      case 'image/jpg':
        return 'jpg';
      default:
        throw new Error(`ImageFile: Unknown mimetype "${mimetype}"`)
    }
  }

  async onApplicationBootstrap(): Promise<any> {
    await this.loadImageSizesFromFile();
  }

  private async loadImageSizesFromFile(): Promise<void> {
    const sizesFilename = join(this.config.imagePath, 'sizes.json');


    this.sizes = await FileSystem.exists(sizesFilename)
      .then((isExist: boolean) => {
        if (!isExist) {
          this.log.error('ImageFile', `Image Sizes not found on file "${sizesFilename})`)
          return {}
        }
        return FileSystem.readJson<ImageSizes>(sizesFilename);
      });

    this.log.info('ImageFile', `Image Sizes => ${JSON.stringify(this.sizes)}`);
  }
}

export function buildImageUrlFactory(
  fileId: number, menuId: number, groupId: number, size: ImageSizeName | string, mimetype: string, filename: string
): BuildImageUrl {
  return {
    fileId,
    menuId,
    groupId,
    size,
    mimetype,
    filename,
  };
}
