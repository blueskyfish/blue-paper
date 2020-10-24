import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImageParams } from './image-params';

/**
 * Delivery images
 *
 * * `/images/23/fullwidth/holiday-on-fiesta.jpg`
 * * `/images/23/gallery/holiday-on-fiesta.jpg`
 * * `/images/23/preview/holiday-on-fiesta.jpg`
 *
 * **Parts**
 *
 * * Prefix: `/images`
 * * Group:  `23`
 * * Size: `fullwidth` or `gallery` etc
 * * Filename
 *
 * **Unique Key**
 *
 * The unique key is `groupId` and `filename`
 */
@Controller('/images')
export class ImageController {

  /**
   * Deliveries image
   *
   * @param {ImageParams} params the image parameters.
   * @param {e.Response} res the express response
   */
  @Get('/:groupId/:size/:filename')
  async getPngImage(@Param() params: ImageParams, @Res() res: Response): Promise<void> {

    res.send({
      groupId: params.groupId,
      size: params.size,
      filename: params.filename,
    });
  }

}
