import { LogService, toInt } from '@blue-paper/server-commons';
import {
  HEADER_CONTENT_TYPE,
  HEADER_ETAG,
  HEADER_IF_NOT_MATCH,
  ImageDeliveryService
} from '@blue-paper/server-image-delivery';
import { FileInfo, ImageManagerService } from '@blue-paper/server-image-editor';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { EditorImageDataParams, EditorImageParams } from './editor-image.params';
import { ERROR_IMAGE_GROUP } from './editor.const';

@Controller('/editor/image')
export class EditorImageController {

  constructor(
    private log: LogService,
    private imageService: ImageDeliveryService,
    private imageManager: ImageManagerService,
  ) {
  }

  @Get('/list/:menuId/:groupId')
  async getImageFromMenuGroup(@Param() params: EditorImageParams): Promise<ImageUrlInfo[]> {
    return await this.imageManager.getImageListFromMenuGroup(toInt(params.menuId), toInt(params.groupId));
  }

  /**
   * Get the image e.g. `/editor/image/:imageData.jpg`
   */
  @Get('/:imageData.:fileExtension(jpg|png)')
  async getImageBuffer(
    @Param() params: EditorImageDataParams, @Headers(HEADER_IF_NOT_MATCH) etagMatch: string, @Res() res: Response
  ): Promise<void> {

    this.log.debug(ERROR_IMAGE_GROUP, `url: ${params.imageData}.${params.fileExtension}\neTag: ${etagMatch}`);

    // extract the image url entity
    const data = await this.imageService.findImageUrl(params.imageData);

    if (!isNil(etagMatch) && data.etag === etagMatch) {
      this.log.debug(ERROR_IMAGE_GROUP, `Image not modified (${etagMatch})`)
      res.status(HttpStatus.NOT_MODIFIED).end();
      return;
    }

    const buffer = await this.imageService.getImageBuffer(data);

    res.header(HEADER_ETAG, data.etag)
      .header(HEADER_CONTENT_TYPE, data.mimetype)
      .send(buffer);
  }


  @Get('/info/:fileId(\\d+)/:sizeName')
  async getImageUrlInfo(@Param('fileId') fileId: string, @Param('sizeName') sizeName: string): Promise<ImageUrlInfo> {
    return await this.imageManager.getImageUrlInfo(toInt(fileId), sizeName);
  }


  @Post('/upload/:menuId/:groupId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param() params: EditorImageParams, @UploadedFile('file') file: FileInfo): Promise<ImageUrlInfo> {

    if (isNil(file)) {
      throw new BadRequestException('File bad mimetype');
    }

    return await this.imageManager.imageUpload(toInt(params.menuId), toInt(params.groupId), file);
  }

}
