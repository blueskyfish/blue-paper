import { LogService } from '@blue-paper/server-commons';
import { BuildImageUrl, ImageFileService } from '@blue-paper/server-image-commons';
import { IRepositoryPool } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as marked from 'marked';
import { PaperInfo } from '../models/paper-info';
import { EncryptImageUrlFunc, ImageRenderer } from '../renderer';
import { HtmlData, HtmlDataProvider, mergeFrom } from './html-data.provider';

/**
 * The data entity for the index pages
 */
export interface HtmlIndexData extends HtmlData {

  /**
   * The content of the index page
   */
  content: {

    /**
     * The title of the page content
     */
    title: string;

    /**
     * The content
     */
    body: string;
  }
}

/**
 * Service collects the page data.
 */
@Injectable()
export class HtmlIndexService implements HtmlDataProvider<HtmlIndexData> {

  constructor(private log: LogService, private imageFile: ImageFileService) {
  }

  /**
   * Process the collection of the index pages
   *
   * @param {PaperInfo} paperInfo
   * @param {IRepositoryPool} rep
   * @returns {Promise<HtmlData>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getData(paperInfo: PaperInfo, rep: IRepositoryPool): Promise<HtmlIndexData> {

    const dbPage = await rep.page.findPage(paperInfo.groupId);
    if (isNil(dbPage)) {
      throw new NotFoundException('Page content not found');
    }

    const {content, title} = dbPage;

    const dbFiles = await rep.file.getImageListFromMenuGroup(paperInfo.menuId, paperInfo.groupId);
    const sourceList = this.imageFile.toImageUrlInfoList(dbFiles);
    // console.log(sourceList);

    const renderer = new ImageRenderer({}, this.log, sourceList, this.encryptImageUrlFunc);
    const body = marked(content, {renderer});

    return mergeFrom<HtmlIndexData>(paperInfo, {
      content: {
        title,
        body
      }
    });
  }

  private encryptImageUrlFunc: EncryptImageUrlFunc = (data: ImageUrlInfo) => {
    const { fileId, menuId, groupId, size, filename, mimetype, etag } = data;
    const buildImageUrl: BuildImageUrl = {
      fileId,
      menuId,
      groupId,
      size,
      filename,
      etag,
      mimetype,
    };
    return this.imageFile.buildEncryptedImageUrl(buildImageUrl);
  }
}
