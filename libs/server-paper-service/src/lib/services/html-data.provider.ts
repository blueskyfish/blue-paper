import { IRepositoryPool } from '@blue-paper/server-repository';
import { MenuItem } from '../models/menu-item';
import { PaperInfo } from '../models/paper-info';

/**
 * The base html data entity.
 */
export interface HtmlData {

  /**
   * The title of the html data
   */
  title: string;

  /**
   * The navbar menu list
   */
  navbar: MenuItem[];

  /**
   * The footer meu list.
   */
  footer: MenuItem[];
}


export interface HtmlDataProvider<D extends HtmlData> {

  /**
   * Collect the data
   *
   * @param {PaperInfo} paperInfo the paper information about the current html request
   * @param {IRepositoryPool} rep the repository pool für the database
   * @returns {Promise<D>} the html data
   */
  getData(paperInfo: PaperInfo, rep: IRepositoryPool): Promise<D>;
}

/**
 * Merges the attributes from {@link PaperInfo} and the other {@link HtmlData} to one entity
 *
 * @param {PaperInfo} paperInfo use the attribute `title`, `navbar` and `footer` from the paper information
 * @param {Partial<D>} data the other html data
 * @returns {Partial<D>}
 */
export const mergeFrom = <D extends HtmlData>(paperInfo: PaperInfo, data: Partial<D>): D => {
  return {
    title: paperInfo.title,
    navbar: Array.isArray(paperInfo.navbar) ? [...paperInfo.navbar] : [],
    footer: Array.isArray(paperInfo.footer) ? [...paperInfo.footer] : [],
    ...data,
  } as D;
}
