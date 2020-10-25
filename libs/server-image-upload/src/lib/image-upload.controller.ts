import { LogService } from '@blue-paper/server-commons';
import { isNil } from '@blue-paper/shared-commons';
import { BadRequestException, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileInfo } from './entities/file-info';
import { ImageUploadParams } from './image-upload.params';

@Controller('/upload')
export class ImageUploadController {

  constructor(private log: LogService) {
  }

  @Post('/image/:menuId/:groupId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param() params: ImageUploadParams, @UploadedFile('file') file: FileInfo) {
    if (isNil(file)) {
      throw new BadRequestException('File bad mimetype');
    }

    this.log.debug('Upload', `Upload Image File (params=${JSON.stringify(params)}, File (filename=${file.filename}, mimeType=${file.mimetype}, size=${file.size}))`);
    return 'okay';
  }
}
