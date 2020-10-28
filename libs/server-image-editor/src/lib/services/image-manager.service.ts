import { FileSystem, LogService, timeStop, toInt } from '@blue-paper/server-commons';
import {
  buildImageUrlFactory,
  ImageFileService,
  ImageProcessService,
  ImageSizeName
} from '@blue-paper/server-image-commons';
import { IDbInsertFile, IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FileInfo } from '../entities';
import { ImageEditorParams } from '../image-editor.params';

export const IMAGE_UPLOAD_GROUP = 'ImageUpload';

@Injectable()
export class ImageUploadService {

  constructor(
    private log: LogService,
    private imageFile: ImageFileService,
    private imageProcess: ImageProcessService,
    private repository: RepositoryService
  ) {
  }

  /**
   * Save the uploaded image to the file system and update the file repository. It returns a thumbnail of the image.
   *
   * @param {ImageEditorParams} params the menu id with the group id
   * @param {FileInfo} file the uploaded image file
   * @returns {Promise<any>} the
   */
  async imageUpload(params: ImageEditorParams, file: FileInfo): Promise<ImageUrlInfo> {

    this.log.info(IMAGE_UPLOAD_GROUP, `Image Upload Info (path=${file.path}, orignal=${file.originalname}, buffer=${(isNil(file.buffer) || file.buffer.length === 0) ? 'false' : 'true'})`);

    return this.repository.execute<ImageUrlInfo>(async (rep: IRepositoryPool) => {

      const start = timeStop();
      // clean filename
      const filename = this.imageFile.adjustUploadedFilename(file.originalname);

      const menuId = toInt(params.menuId);
      const groupId = toInt(params.groupId);

      // check if file is unique with group_id + filename
      const dbFile = await rep.file.findFileByGroupAndFilename(groupId, filename);
      if (!isNil(dbFile)) {
        // Combination of group id + filename !!
        throw new BadRequestException(`Image Upload File double (${params.groupId}/${filename}`);
      }

      const imageFilename = await this.imageFile.buildImageFilenameAndPrepareDirectory(params.menuId, params.groupId, filename);

      try {

        this.check(`Move File to ${imageFilename} failed`, await FileSystem.moveFile(file.path, imageFilename));

        const etag = this.imageFile.createEtag(imageFilename);

        await rep.startTransaction();
        const values: IDbInsertFile = {
          menuId,
          groupId,
          filename,
          mimetype: file.mimetype,
          etag,
          size: file.size
        };
        const fileId = await rep.file.insertFile(values);
        await rep.commit();

        const buildImageData = buildImageUrlFactory(
          fileId, menuId, groupId, ImageSizeName.Thumbnail, file.mimetype, filename, etag
        );
        const imageUrl = this.imageFile.buildEncryptedImageUrl(buildImageData);

        // Result Image Url
        return {
          fileId,
          menuId: toInt(params.menuId),
          groupId: toInt(params.groupId),
          filename,
          mimetype: file.mimetype,
          etag: etag,
          size: ImageSizeName.Thumbnail,
          imageUrl,
        } as ImageUrlInfo;

      } catch (e) {
        await rep.rollback();
        this.log.error(IMAGE_UPLOAD_GROUP, `Image Upload is failed (${e.message})`);
        console.log(e.stack);
        throw new BadRequestException(`File Upload failed (${params.menuId}/${params.groupId}/${filename})`);
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
