import { FileSystem, LogService, timeStop } from '@blue-paper/server-commons';
import {
  buildImageUrlFactory,
  getImageSizeNameFrom,
  ImageFileService,
  ImageSizeName
} from '@blue-paper/server-image-commons';
import { IDbInsertFile, IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FileInfo } from '../entities';

export const IMAGE_MANAGER_GROUP = 'ImageManager';

@Injectable()
export class ImageManagerService {

  constructor(
    private log: LogService,
    private repository: RepositoryService,
    private imageFile: ImageFileService
  ) {
  }

  /**
   * Save the uploaded image to the file system and update the file repository. It returns a thumbnail of the image.
   *
   * **NOTE**: The property buffer is always `null` or `undefined` because usage of disk storage.
   *
   * @param {number} menuId the menu id
   * @param {number} groupId the group id
   * @param {FileInfo} file the uploaded image file
   * @returns {Promise<any>} the
   */
  async imageUpload(menuId: number, groupId: number, file: FileInfo): Promise<ImageUrlInfo> {

    this.log.info(IMAGE_MANAGER_GROUP,
      `Image Upload Info (path=${file.path}, orignal=${file.originalname}, mimetype=${file.mimetype})`);

    return this.repository.execute<ImageUrlInfo>(async (rep: IRepositoryPool) => {

      const start = timeStop();
      // clean filename
      const filename = this.imageFile.adjustUploadedFilename(file.originalname);

      // check if file is unique with group_id + filename
      const dbFile = await rep.file.findFileByGroupAndFilename(groupId, filename);
      if (!isNil(dbFile)) {
        // Combination of group id + filename !!
        throw new BadRequestException(`Image Upload File double (${groupId}/${filename}`);
      }

      const imageFilename = await this.imageFile.buildImageFilenameAndPrepareDirectory(menuId, groupId, filename);

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
          menuId,
          groupId,
          filename,
          mimetype: file.mimetype,
          etag: etag,
          size: ImageSizeName.Thumbnail,
          imageUrl,
        } as ImageUrlInfo;

      } catch (e) {
        await rep.rollback();
        this.log.error(IMAGE_MANAGER_GROUP, `Image Upload is failed (${e.message})`);
        // console.log(e.stack);
        throw new BadRequestException(`File Upload failed (${menuId}/${groupId}/${filename})`);
      } finally {
        this.log.debug(IMAGE_MANAGER_GROUP,
          `Image Upload in ${start.duration()} ms (${menuId}/${groupId}/${filename})`);
      }
    });
  }

  async getImageListFromMenuGroup(menuId: number, groupId: number): Promise<ImageUrlInfo[]> {
    return this.repository.execute<ImageUrlInfo[]>(async (rep: IRepositoryPool) => {

      const dbFileList = await rep.file.getImageListFromMenuGroup(menuId, groupId);

      return dbFileList
        .map(({ id, menuId, groupId, filename, mimetype, etag}) => {
          // Prepare image url
          const imageData = buildImageUrlFactory(id, menuId, groupId, ImageSizeName.Thumbnail, mimetype, filename, etag);
          const imageUrl = this.imageFile.buildEncryptedImageUrl(imageData);

          return {
            fileId: id,
            menuId,
            groupId,
            size: ImageSizeName.Thumbnail,
            filename,
            mimetype,
            etag,
            imageUrl,
          } as ImageUrlInfo;
        });
    });
  }

  /**
   * Get the image url information from given file id with the size name
   * @param {number} fileId
   * @param {string} sizeName
   * @returns {Promise<ImageUrlInfo>}
   */
  async getImageUrlInfo(fileId: number, sizeName: string): Promise<ImageUrlInfo> {

    const size = getImageSizeNameFrom(sizeName);

    return this.repository.execute<ImageUrlInfo>(async (rep: IRepositoryPool) => {
      const db = await rep.file.findFileById(fileId);
      if (isNil(db)) {
        throw new NotFoundException(`Image "${fileId}" is not found`);
      }

      const { id, menuId, groupId, mimetype, filename, etag } = db;

      const buildImageData = buildImageUrlFactory(id, menuId, groupId, size, mimetype, filename, etag);
      const imageUrl = this.imageFile.buildEncryptedImageUrl(buildImageData);

      return {
        fileId,
        menuId,
        groupId,
        mimetype,
        filename,
        size,
        etag,
        imageUrl
      }; // as ImageUrlInfo
    });
  }

  private check(message: string, value: boolean): void {
    if (!value) {
      this.log.error(IMAGE_MANAGER_GROUP, message);
      throw new Error(message);
    }
  }
}
