import { LogService } from '@blue-paper/server-commons';
import { BuildImageUrl, ImageFileService } from '@blue-paper/server-image-commons';
import { IRepositoryPool } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { ImageUrlInfo } from '@blue-paper/shared-entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as marked from 'marked';
import { EncryptImageUrlFunc, ImageRenderer } from '../renderer';
import { HtmlIndexData, PaperInfo } from './entities';
import { HtmlDataProvider } from './html-data.provider';
import { mergeFrom } from './html-data.util';

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
