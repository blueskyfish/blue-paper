import { IRepositoryPool } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as marked from 'marked';
import { PaperInfo } from '../models/paper-info';
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
export class HtmlIndexService implements HtmlDataProvider<HtmlIndexData>{

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

    return mergeFrom<HtmlIndexData>(paperInfo, {
      content: {
        title: dbPage.title,
        body: marked(dbPage.content),
      }
    });
  }
}
