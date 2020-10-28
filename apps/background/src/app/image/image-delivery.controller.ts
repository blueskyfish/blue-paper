import { ImageDataParams } from '@blue-paper/server-image-commons';
import { HEADER_IF_NOT_MATCH, ImageDeliveryService } from '@blue-paper/server-image-delivery';
import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/images')
export class ImageDeliveryController {

  constructor(private imageDelivery: ImageDeliveryService) {
  }

  /**
   * Get the image e.g. `/editor/image/:imageData.jpg`
   */
  @Get('/:imageData.:fileExtension(jpg|png)')
  async getImageBuffer(
    @Param() params: ImageDataParams,
    @Headers(HEADER_IF_NOT_MATCH) etagMatch: string,
    @Res() res: Response
  ): Promise<void> {

    await this.imageDelivery.responseImage(params.imageData, params.fileExtension, etagMatch, res);
  }
}
