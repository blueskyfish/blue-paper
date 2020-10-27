import { FileSystem, LogService, timeStop, toInt } from '@blue-paper/server-commons';
import {
  buildImageUrlFactory,
  ImageFileService,
  ImageProcessService,
  ImageSettingService,
  ImageSizeName
} from '@blue-paper/server-image-commons';
import { IDbInsertFile, IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { FileInfo, PreviewFile } from '../entities';
import { ImageUploadParams } from '../image-upload.params';

export const IMAGE_UPLOAD_GROUP = 'ImageUpload';

@Injectable()
export class ImageUploadService {

  constructor(
    private log: LogService,
    private imageSetting: ImageSettingService,
    private imageFile: ImageFileService,
    private imageProcess: ImageProcessService,
    private repository: RepositoryService
  ) {
  }

  /**
   * Save the uploaded image to the file system and update the file repository. It returns a thumbnail of the image.
   *
   * @param {ImageUploadParams} params the menu id with the group id
   * @param {FileInfo} file the uploaded image file
   * @returns {Promise<any>} the
   */
  async imageUpload(params: ImageUploadParams, file: FileInfo): Promise<PreviewFile> {

    this.log.info(IMAGE_UPLOAD_GROUP, `Image Upload Info (path=${file.path}, orignal=${file.originalname}, buffer=${(isNil(file.buffer) || file.buffer.length === 0) ? 'false' : 'true'})`)

    return this.repository.execute<PreviewFile>(async (rep: IRepositoryPool) => {

      const start = timeStop();
      // clean filename
      const filename = this.imageFile.adjustFilename(file.originalname);

      const menuId = toInt(params.menuId);
      const groupId = toInt(params.groupId);

      try {

        // check if file is unique with group_id + filename
        const dbFile = await rep.file.findFileByGroupAndFilename(groupId, filename);
        if (!isNil(dbFile)) {
          // Combination of group id + filename !!
          throw new BadRequestException(`Image Upload File double (${params.groupId}/${filename}`);
        }

        const saveImagePath = join(this.imageSetting.imagePath, params.menuId, params.groupId);
        const isExist = await FileSystem.exists(saveImagePath);
        if (!isExist) {
          this.check(`Create directory ${saveImagePath} failed`, await FileSystem.mkdir(saveImagePath));
        }
        // the complete filename to the new image
        const imageFilename = join(saveImagePath, filename);

        this.check(`Move File to ${imageFilename} failed`, await FileSystem.moveFile(file.path, imageFilename));

        const etag = this.imageFile.createEtag(imageFilename);

        await  rep.startTransaction();
        const values: IDbInsertFile = {
          menuId,
          groupId,
          filename,
          mimetype: file.mimetype,
          etag,
          size: file.size,
        };
        const fileId = await rep.file.insertFile(values);
        await rep.commit();

        const buildImageData = buildImageUrlFactory(fileId, menuId, groupId, ImageSizeName.Thumbnail, file.mimetype, filename);
        const imageUrl = this.imageFile.buildImageUrl(buildImageData);

        // Result
        return {
          id: fileId,
          menuId: toInt(params.menuId),
          groupId: toInt(params.groupId),
          imageUrl,
          mimetype: file.mimetype,
          etag: etag,
          size: file.size,
        };

      } catch (e) {
        await rep.rollback();
        this.log.error(IMAGE_UPLOAD_GROUP, `Image Upload is failed (${e.message})`);
        console.log(e.stack);
        throw new BadRequestException(`File Upload failed (${params.menuId}/${params.groupId}/${filename})`)
      } finally {
        this.log.debug(IMAGE_UPLOAD_GROUP,
          `Image Upload in ${start.duration()} ms (${params.menuId}/${params.groupId}/${filename})`);
      }
    });
  }

  private check(message: string, value: boolean): void {
    if (!value) {
      this.log.error(IMAGE_UPLOAD_GROUP, message);
      throw new Error(message);
    }
  }
}
