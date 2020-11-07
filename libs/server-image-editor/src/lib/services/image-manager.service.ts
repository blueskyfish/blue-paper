import { FileSystem, LogService, timeStop } from '@blue-paper/server-commons';
import {
  buildImageUrlFactory,
  ImageFileService,
  ImageProcessService,
  ImageSize
} from '@blue-paper/server-image-commons';
import { HEADER_CONTENT_TYPE, HEADER_ETAG } from '@blue-paper/server-image-delivery';
import { IDbInsertFile, IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { FileInfo } from '../entities';

export const IMAGE_MANAGER_GROUP = 'ImageManager';

@Injectable()
export class ImageManagerService {

  constructor(
    private log: LogService,
    private repository: RepositoryService,
    private imageFile: ImageFileService,
    private imageProcess: ImageProcessService
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
   * @returns {Promise<ImageUrlInfo>} the
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
        throw new BadRequestException(`${IMAGE_MANAGER_GROUP}: Image Upload File double (${groupId}/${filename}`);
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
          fileId, menuId, groupId, ImageSize.thumbnail, file.mimetype, filename, etag
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
          size: ImageSize.thumbnail,
          imageUrl,
        } as ImageUrlInfo;

      } catch (e) {
        await rep.rollback();
        this.log.error(IMAGE_MANAGER_GROUP, `Image Upload is failed (${e.message})`);
        // console.log(e.stack);
        throw new BadRequestException(
          `${IMAGE_MANAGER_GROUP}: File Upload failed (${menuId}/${groupId}/${filename})`
        );
      } finally {
        this.log.debug(IMAGE_MANAGER_GROUP,
          `Image Upload in ${start.duration()} ms (${menuId}/${groupId}/${filename})`);
      }
    });
  }

  async getImageListFromMenuGroup(menuId: number, groupId: number): Promise<ImageUrlInfo[]> {
    return this.repository.execute<ImageUrlInfo[]>(async (rep: IRepositoryPool) => {

      const dbFileList = await rep.file.getImageListFromMenuGroup(menuId, groupId);
      const size = ImageSize.thumbnail;

      return dbFileList
        .map(({ fileId, menuId, groupId, filename, mimetype, etag}) => {
          // Prepare image url
          const imageData = buildImageUrlFactory(fileId, menuId, groupId, size, mimetype, filename, etag);
          const imageUrl = this.imageFile.buildEditorImageUrl(imageData, size);

          return {
            fileId,
            menuId,
            groupId,
            size,
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
   * @param {number} file_Id
   * @param {string} size
   * @returns {Promise<ImageUrlInfo>}
   */
  async getImageUrlInfo(file_Id: number, size: string): Promise<ImageUrlInfo> {

    return this.repository.execute<ImageUrlInfo>(async (rep: IRepositoryPool) => {
      const db = await rep.file.findFileById(file_Id);
      if (isNil(db)) {
        throw new NotFoundException(`Image "${file_Id}" is not found`);
      }

      const { fileId, menuId, groupId, mimetype, filename, etag } = db;

      const buildImageData = buildImageUrlFactory(fileId, menuId, groupId, size, mimetype, filename, etag);
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

  /**
   * Delivery the image. Only available in the editor mode.
   */
  async renderImage(menuId: number, groupId: number, filename: string, sizeName: string, etagMatch: string, res: Response): Promise<void> {

    await this.repository.execute<void>(async (rep: IRepositoryPool) => {

      const timer = timeStop();
      try {
        const imageFilename = this.imageFile.buildImageFilename(menuId, groupId, filename);
        const isExistImage = await FileSystem.exists(imageFilename);
        const dbFile = await rep.file.findFileByGroupAndFilename(groupId, filename);

        if (!isExistImage || isNil(dbFile) || dbFile.menuId !== menuId) {
          throw new NotFoundException(`Image (${menuId}/${groupId}/${sizeName}/${filename}) is not found`);
        }

        if (!isNil(etagMatch) && dbFile.etag === etagMatch) {
          this.log.debug('ImageEditor', `Image not modified (${etagMatch})`)
          res.status(HttpStatus.NOT_MODIFIED).end();
          return;
        }

        const theImageSize = this.imageFile.getSizeFrom(sizeName);
        const buffer = await this.imageProcess.processFile(theImageSize, imageFilename);

        res
          .header(HEADER_ETAG, dbFile.etag)
          .header(HEADER_CONTENT_TYPE, dbFile.mimetype)
          .send(buffer);

      } finally {
        this.log.debug('ImageEditor', `Image (${menuId}/${groupId}/${sizeName}/${filename} is delivery in ${timer.duration()} ms`);
      }
    });
  }

  private check(message: string, value: boolean): void {
    if (!value) {
      this.log.error(IMAGE_MANAGER_GROUP, message);
      throw new Error(message);
    }
  }
}
