import { LogService, toInt } from '@blue-paper/server-commons';
import { HEADER_IF_NOT_MATCH, ImageDeliveryService } from '@blue-paper/server-image-delivery';
import { FileInfo, ImageManagerService } from '@blue-paper/server-image-editor';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { EditorImageDataParams, EditorImageParams } from './params';

@ApiTags('Images')
@Controller('/editor/image')
export class EditorImageController {

  constructor(
    private log: LogService,
    private imageService: ImageDeliveryService,
    private imageManager: ImageManagerService,
  ) {
  }

  @ApiExcludeEndpoint(true)
  @Get('/list/:menuId/:groupId')
  async getImageFromMenuGroup(@Param() params: EditorImageParams): Promise<ImageUrlInfo[]> {
    return await this.imageManager.getImageListFromMenuGroup(toInt(params.menuId), toInt(params.groupId));
  }

  @ApiExcludeEndpoint(true)
  /**
   * Get from encrypted url the image e.g. `/editor/image/:imageData.jpg`
   */
  @Get('/:imageData(*).:imageFile(jpg|png)')
  async getImageBuffer(
    @Param() params: EditorImageDataParams,
    @Headers(HEADER_IF_NOT_MATCH) etagMatch: string,
    @Res() res: Response
  ): Promise<void> {

    await this.imageService.responseImage(params.imageData, etagMatch, res);
  }

  @ApiExcludeEndpoint(true)
  @Get('/info/:fileId(\\d+)/:sizeName')
  async getImageUrlInfo(@Param('fileId') fileId: string, @Param('sizeName') sizeName: string): Promise<ImageUrlInfo> {
    return await this.imageManager.getImageUrlInfo(toInt(fileId), sizeName);
  }


  @ApiExcludeEndpoint(true)
  @Post('/upload/:menuId/:groupId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param() params: EditorImageParams, @UploadedFile('file') file: FileInfo): Promise<ImageUrlInfo> {

    if (isNil(file)) {
      throw new BadRequestException('File bad mimetype');
    }

    return await this.imageManager.imageUpload(toInt(params.menuId), toInt(params.groupId), file);
  }

}
