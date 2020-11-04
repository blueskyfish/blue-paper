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
  @Get('/*.(jpg|png)$')
  async getImageBuffer(
    @Param('0') imageData: string,
    @Headers(HEADER_IF_NOT_MATCH) etagMatch: string,
    @Res() res: Response
  ): Promise<void> {
    await this.imageDelivery.responseImage(imageData, etagMatch, res);
  }
}
