import { IRepositoryPool } from '@blue-paper/server-repository';
import { Injectable } from '@nestjs/common';
import { PaperInfo } from '../..';
import { HtmlData, HtmlDataProvider } from './html-data.provider';

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
    content: string;
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

    return {
      title: paperInfo.title,
      navbar: Array.isArray(paperInfo.navbar) ? [ ...paperInfo.navbar ] : [],
      footer: Array.isArray(paperInfo.footer) ? [ ...paperInfo.footer ] : [],
      content: {
        title: 'Test',
        content: '<p>Hello Test</p>'
      }
    };
  }
}
