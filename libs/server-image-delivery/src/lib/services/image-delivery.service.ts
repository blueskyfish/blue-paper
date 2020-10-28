import {
  BuildImageUrl,
  getImageSizeNameFrom,
  ImageFileService,
  ImageProcessService
} from '@blue-paper/server-image-commons';
import { IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { Injectable, NotFoundException } from '@nestjs/common';

/**
 * Image delivery service
 */
@Injectable()
export class ImageDeliveryService {

  constructor(
    private repository: RepositoryService,
    private imageFile: ImageFileService,
    private imageProcess: ImageProcessService,
  ) {
  }

  /**
   * Get the image url entity from encrypted image data and check if the file exist.
   *
   * @param {string} imageData the encrypted image data
   * @returns {BuildImageUrl} the image url entity
   */
  async findImageUrl(imageData: string): Promise<BuildImageUrl> {
    return this.repository.execute<BuildImageUrl>(async (rep: IRepositoryPool) => {

      const data = this.imageFile.getImageUrlFromEncryptedData(imageData);
      if (isNil(data)) {
        throw new NotFoundException('Image is not found');
      }

      const dbFile = await rep.file.findFileById(data.fileId);
      if (isNil(dbFile) || dbFile.etag !== data.etag) {
        throw new NotFoundException('Image is not found');
      }

      return data;
    });
  }

  /**
   * Get the image buffer from the image url entity.
   *
   * @param {BuildImageUrl} data the image url entity
   * @returns {Promise<Buffer>} the buffer
   */
  async getImageBuffer(data: BuildImageUrl): Promise<Buffer> {
    const filename = await this.imageFile.buildImageFilenameAndPrepareDirectory(`${data.menuId}`, `${data.groupId}`, data.filename);
    const imageSize = this.imageFile.getSizeFrom(getImageSizeNameFrom(data.size));
    return await this.imageProcess.processFile(imageSize, filename);
  }

}
