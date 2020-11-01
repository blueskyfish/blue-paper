import { FileSystem, LogService, timeStop } from '@blue-paper/server-commons';
import {
  BuildImageUrl,
  ImageFileService,
  ImageProcessService
} from '@blue-paper/server-image-commons';
import { IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { HEADER_CONTENT_TYPE, HEADER_ETAG } from '../image-delivery.params';

const IMAGE_DELIVERY_GROUP = 'ImageDelivery';

/**
 * Image delivery service
 */
@Injectable()
export class ImageDeliveryService {

  constructor(
    private log: LogService,
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

      this.log.debug(IMAGE_DELIVERY_GROUP, `Found file (${data.fileId} => ${data.filename} => ${data.size})`);
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
    const filename = await this.imageFile.buildImageFilename(data.menuId, data.groupId, data.filename);

    const isExist = await FileSystem.exists(filename);
    if (!isExist) {
      throw new NotFoundException(
        `${IMAGE_DELIVERY_GROUP}: File is not exist (${data.menuId}/${data.groupId}/${data.filename})`);
    }

    const imageSize = this.imageFile.getSizeFrom(data.size);
    this.log.debug(IMAGE_DELIVERY_GROUP, `Image Size (${data.size} => ${imageSize.width || 'auto'} x ${imageSize.height || 'auto'}`)
    return await this.imageProcess.processFile(imageSize, filename);
  }

  /**
   * Collect the image data and buffer and send as response
   *
   */
  async responseImage(imageData: string, etagMatch: string, res: Response): Promise<void> {

    const timer = timeStop();
    try {
      // this.log.debug(IMAGE_DELIVERY_GROUP, `url: ${imageData}\neTag: ${etagMatch || 'not founded'}`);

      // extract the image url entity
      const data = await this.findImageUrl(imageData);
      this.log.debug(IMAGE_DELIVERY_GROUP, `Image (${data.filename} => ${data.size})`);

      const etagWithSize = this.imageFile.createSizedEtag(data.size, data.etag);
      this.log.debug(IMAGE_DELIVERY_GROUP, `Compare eTag:\n${etagWithSize}\n${etagMatch || 'not found'}`);

      if (!isNil(etagMatch) && etagWithSize === etagMatch) {
        this.log.debug(IMAGE_DELIVERY_GROUP, `Image not modified (${etagMatch})`)
        res.status(HttpStatus.NOT_MODIFIED).end();
        return;
      }

      const buffer = await this.getImageBuffer(data);

      res.header(HEADER_ETAG, etagWithSize)
        .header(HEADER_CONTENT_TYPE, data.mimetype)
        .send(buffer);

    } finally {
      this.log.debug(IMAGE_DELIVERY_GROUP, `Image delivery in ${timer.duration()} ms`);
    }
  }
}
