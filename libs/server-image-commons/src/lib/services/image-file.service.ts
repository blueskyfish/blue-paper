import { CryptoService } from '@blue-paper/server-authentication';
import { ENCODING_HEX, FileSystem, LogService } from '@blue-paper/server-commons';
import { IDbFile } from '@blue-paper/server-repository';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { createHash } from 'crypto';
import { join } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { ImageSize, ImageSizeDict, ImageSizeEntity, ImageSizeNameStrings, ImageSizeValue } from '../entities';
import { BuildImageUrl } from './entities';
import { ImageSettingService } from './image-setting.service';

export const IMAGE_FILE_GROUP = 'ImageFile';

export const DEFAULT_SIZE: ImageSizeValue = Object.freeze({
  width: 64,
  height: 64,
  hash: 'xxx',
});

/**
 * Manages the list of image sizes that mapping to names and filename of image
 */
@Injectable()
export class ImageFileService implements OnApplicationBootstrap {

  private readonly imageSizes: ImageSizeDict = new ImageSizeDict(DEFAULT_SIZE)

  constructor(
    private log: LogService,
    private config: ImageSettingService,
    private cryptoService: CryptoService
  ) {
  }

  /**
   * Get the size dimension + hash from the name.
   *
   * @param {ImageSizeNameStrings | string} name the size name
   * @returns {ImageSizeValue} the dimension or the {@link DEFAULT_SIZE} size,
   */
  getSizeFrom(name: ImageSizeNameStrings | string): ImageSizeValue {
    return this.imageSizes.get(name);
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
   * It is check if the given directory is exist and if not existing then it is creating.
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
   * Create an etag with the image size name and the given etag.
   *
   * @param {ImageSize} size the image size name
   * @param {string} etag the existing etag
   * @returns {string} the new etag
   */
  createSizedEtag(size: string, etag: string): string {
    const { hash } = this.imageSizes.get(size);
    return `${hash}-${etag}`;
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
    // TODO The public image prefix url
    return `/images/${imagePart}.${ext}`;
  }

  /**
   * Build from the given image url entity and returns an editor image url (only for Editors)
   *
   * @param {BuildImageUrl} data data the build image entity
   * @param {ImageSize} sizeName
   * @returns {string}
   */
  buildEditorImageUrl(data: BuildImageUrl, sizeName: ImageSize): string {
    // TODO The editor Image prefix url
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
        throw new Error(`${IMAGE_FILE_GROUP}: Unknown mimetype "${mimetype}"`);
    }
  }

  async onApplicationBootstrap(): Promise<any> {
    await this.loadImageSizesFromFile();
  }

  /**
   * Convert an list of image files into an list of {@link ImageUrlInfo} entities
   * @param {IDbFile[]} dbFiles the list of image files
   * @param {ImageSize} size the size of the image
   * @returns {ImageUrlInfo[]}
   */
  toImageUrlInfoList(dbFiles: IDbFile[], size: ImageSize = ImageSize.thumbnail): ImageUrlInfo[] {
    return dbFiles
      .map(({ fileId, menuId, groupId, filename, mimetype, etag }) => {
        // Prepare image url
        const imageData = buildImageUrlFactory(fileId, menuId, groupId, size, mimetype, filename, etag);
        const imageUrl = this.buildEditorImageUrl(imageData, size);

        return {
          fileId,
          menuId,
          groupId,
          size,
          filename,
          mimetype,
          etag,
          imageUrl
        } as ImageUrlInfo;
      });
  }

  private async loadImageSizesFromFile(): Promise<void> {

    const sizesFilename = join(this.config.imagePath, 'sizes.json');


    const isExist = await FileSystem.exists(sizesFilename)
    if (!isExist) {
      this.log.error(IMAGE_FILE_GROUP, `Image Sizes not found on file "${sizesFilename})`);
      return;
    }
    const sizeList = await FileSystem.readJson<ImageSizeEntity[]>(sizesFilename);
    sizeList.forEach((entity: ImageSizeEntity) => {
      const hash = createHash('sha256').update(`${uuidV4()}-${entity.name}`).digest(ENCODING_HEX);
      this.imageSizes.add(entity, hash);
    });


    this.log.info(IMAGE_FILE_GROUP, this.imageSizes.toString());
  }
}

/**
 * Create an {@link BuildImageUrl} entity from the parameters
 */
export function buildImageUrlFactory(
  fileId: number, menuId: number, groupId: number, size: ImageSizeNameStrings | string, mimetype: string, filename: string, etag: string
): BuildImageUrl {
  return {
    fileId,
    menuId,
    groupId,
    size,
    mimetype,
    filename,
    etag
  };
}
