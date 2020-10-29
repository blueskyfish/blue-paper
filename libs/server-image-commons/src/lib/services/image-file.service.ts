import { CryptoService } from '@blue-paper/server-authentication';
import { ENCODING_HEX, FileSystem, LogService } from '@blue-paper/server-commons';
import { toLower } from '@blue-paper/shared-commons';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { createHash } from 'crypto';
import { join } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { IImageSize, ImageSizeName, ImageSizes } from '../entities';
import { BuildImageUrl } from './entities';
import { ImageSettingService } from './image-setting.service';

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

  /**
   * Get the size dimension from the name
   * @param {ImageSizeName} name the size name
   * @returns {IImageSize} the dimension or the {@link DEFAULT_SIZE} size,
   */
  getSizeFrom(name: ImageSizeName): IImageSize {
    return this.sizes[name] || DEFAULT_SIZE;
  }

  /**
   * Adjust the uploaded filename
   * @param {string} filename
   * @returns {string}
   */
  adjustUploadedFilename(filename: string): string {
    return filename
      .replace(/[ _(),!?+]/, '-')
      .toLowerCase();
  }

  /**
   * Build the complete filename of the image on the filesystem from the given parameters.
   *
   * It is check if the given directory is exist and if not then it is creating.
   *
   * @param {number} menuId the menu id as string
   * @param {number} groupId the group id as string
   * @param {string} filename the filename of the image
   * @returns {Promise<string>} the complete filename
   */
  async buildImageFilenameAndPrepareDirectory(menuId: number, groupId: number, filename: string): Promise<string> {
    const saveImagePath = join(this.config.imagePath, `${menuId}`, `${groupId}`);
    const isExist = await FileSystem.exists(saveImagePath);
    if (!isExist) {
      await FileSystem.mkdir(saveImagePath);
    }
    return join(saveImagePath, filename);
  }

  /**
   * Build the complete filename of the image on the filesystem from the given parameters.
   *
   * @param {number} menuId the menu id as string
   * @param {number} groupId the group id as string
   * @param {string} filename the filename of the image
   * @returns {string} the complete filename
   */
  buildImageFilename(menuId: number, groupId: number, filename: string): string {
    return join(this.config.imagePath, `${menuId}`, `${groupId}`, filename);
  }

  /**
   * Create the etag from given filename or buffer. As prefix it is use an uuid v4 string
   *
   * @param {Buffer | string} filenameOrBuffer the filename or the buffer
   * @returns {string} the etag string
   */
  createEtag(filenameOrBuffer: Buffer | string): string {
    const hash = createHash('sha256').update(filenameOrBuffer).digest(ENCODING_HEX);
    return `${uuidV4()}-${hash}`;
  }

  /**
   * Build form the given parameter an encrypted image url.
   *
   * @param {BuildImageUrl} data the build image entity
   * @returns {string}
   */
  buildEncryptedImageUrl(data: BuildImageUrl): string {
    const ext = this.getFileExtension(data.mimetype);
    const imagePart = this.cryptoService.encryptJson(data);
    return `/images/${imagePart}.${ext}`;
  }

  /**
   * Build from the given image url entity and returns an public image url (only for Editors)
   *
   * @param {BuildImageUrl} data data the build image entity
   * @param {ImageSizeName} sizeName
   * @returns {string}
   */
  buildEditorImageUrl(data: BuildImageUrl, sizeName: ImageSizeName): string {
    return `/api/images/${data.menuId}/${data.groupId}/${sizeName}/${data.filename}`;
  }

  /**
   * Decrypt the data and returns the
   * @param {string} data
   * @returns {BuildImageUrl}
   */
  getImageUrlFromEncryptedData(data: string): BuildImageUrl {
    return this.cryptoService.decryptJson<BuildImageUrl>(data);
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

/**
 * Create an {@link BuildImageUrl} entity from the parameters
 */
export function buildImageUrlFactory(
  fileId: number, menuId: number, groupId: number, size: ImageSizeName | string, mimetype: string, filename: string, etag: string
): BuildImageUrl {
  return {
    fileId,
    menuId,
    groupId,
    size,
    mimetype,
    filename,
    etag,
  };
}

/**
 * Get the image size name from string
 * @param {string} sizeName the size name as string
 * @returns {ImageSizeName}
 */
export function getImageSizeNameFrom(sizeName: string): ImageSizeName {
  switch (toLower(sizeName || '')) {
    case 'fullwidth':
      return ImageSizeName.Fullwidth;
    case 'gallery':
      return ImageSizeName.Gallery;
    case 'preview':
      return ImageSizeName.Preview;
    case 'thumbnail':
      return ImageSizeName.Thumbnail;
    default:
      throw new Error(`ImageFile: unknown size name "${sizeName}"`);
  }
}
