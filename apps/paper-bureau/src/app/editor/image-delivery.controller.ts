import { toInt } from '@blue-paper/server-commons';
import { HEADER_IF_NOT_MATCH } from '@blue-paper/server-image-delivery';
import { ImageManagerService } from '@blue-paper/server-image-editor';
import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PublicImageParams } from './params/public-image.params';

@ApiTags('Images')
@Controller('/images')
export class ImageDeliveryController {

  constructor(private imageManager: ImageManagerService) {
  }

  @Get('/:menuId/:groupId/:sizeName/:filename')
  async getPublicImageBuffer(
    @Param() params: PublicImageParams,
    @Headers(HEADER_IF_NOT_MATCH) etagMatch: string,
    @Res() res: Response
  ): Promise<void> {

    await this.imageManager.renderImage(
      toInt(params.menuId),
      toInt(params.groupId),
      params.filename,
      params.sizeName,
      etagMatch,
      res
    );
  }

}
