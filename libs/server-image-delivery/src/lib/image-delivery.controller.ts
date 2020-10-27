import { LogService, toInt } from '@blue-paper/server-commons';
import { BuildImageUrl } from '@blue-paper/server-image-commons';
import { isNil } from '@blue-paper/shared-commons';
import { Controller, Get, Headers, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { HEADER_CONTENT_TYPE, HEADER_ETAG, HEADER_IF_NOT_MATCH, ImageDataParams } from './image-delivery.params';
import { IMAGE_DELIVERY_GROUP } from './image-delivery.const';
import { ImageDeliveryService } from './services/image-delivery.service';

/**
 * Delivery images
 */
@Controller('/images')
export class ImageDeliveryController {

  constructor(
    private log: LogService,
    private imageService: ImageDeliveryService
  ) {
  }

  @Get('/:imageData.:fileExtension(jpg|png)')
  async getImageBuffer(@Param() params: ImageDataParams, @Headers(HEADER_IF_NOT_MATCH) etagMatch: string, @Res() res: Response): Promise<void> {
    this.log.debug(IMAGE_DELIVERY_GROUP, `url: ${params.imageData}.${params.fileExtension}\neTag: ${etagMatch}`);

    // extract the image url entity
    const data = await this.imageService.findImageUrl(params.imageData);

    if (!isNil(etagMatch) && data.etag === etagMatch) {
      this.log.debug(IMAGE_DELIVERY_GROUP, `Image not modified (${etagMatch})`)
      res.status(HttpStatus.NOT_MODIFIED).end();
      return;
    }

    const buffer = await this.imageService.getImageBuffer(data);

    res.header(HEADER_ETAG, data.etag)
      .header(HEADER_CONTENT_TYPE, data.mimetype)
      .send(buffer);
  }

  @Get('/:fileId(\\d+)/:sizeName')
  async getImageUrl(@Param('fileId') fileId: string, @Param('sizeName') sizeName: string): Promise<BuildImageUrl> {
    return await this.imageService.getImageUrlEntity(toInt(fileId), sizeName);
  }
}
