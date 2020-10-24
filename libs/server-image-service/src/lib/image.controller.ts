import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { Response } from 'express';
import { BlogImageParams, PageImageParams } from './image-params';

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

  constructor(private imageService: ImageService) {
  }

  /**
   * Deliveries page image
   *
   * @param {PageImageParams} params the image parameters.
   * @param {e.Response} res the express response
   */
  @Get('/:pageId/:size/:filename')
  async getPageImage(@Param() params: PageImageParams, @Res() res: Response): Promise<void> {

    const buffer = await this.imageService.getPageImage(params);

    // TODO define the Content-Type of the image
    res
      .header('Content-Type', 'image/jpeg')
      .send(buffer);
  }

  /**
   * Deliveries blog image
   *
   * @param {BlogImageParams} params the image parameters.
   * @param {e.Response} res the express response
   */
  @Get('/:themeId/:blogId/:size/:filename')
  async getBlogImage(@Param() params: BlogImageParams, @Res() res: Response): Promise<void> {
    const buffer = await this.imageService.getBlogImage(params);

    // TODO define the Content-Type of the image
    res
      .header('Content-Type', 'image/jpeg')
      .send(buffer);
  }
}
