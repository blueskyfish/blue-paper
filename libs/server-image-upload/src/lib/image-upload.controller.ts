import { isNil } from '@blue-paper/shared-commons';
import { BadRequestException, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PreviewFile } from './entities';
import { FileInfo } from './entities/file-info';
import { ImageUploadParams } from './image-upload.params';
import { ImageUploadService } from './services/image-upload.service';

@Controller('/upload')
export class ImageUploadController {

  constructor(private imageUploadService: ImageUploadService) {
  }

  @Post('/image/:menuId/:groupId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param() params: ImageUploadParams, @UploadedFile('file') file: FileInfo): Promise<PreviewFile> {
    if (isNil(file)) {
      throw new BadRequestException('File bad mimetype');
    }

    return await this.imageUploadService.imageUpload(params, file);
  }
}
