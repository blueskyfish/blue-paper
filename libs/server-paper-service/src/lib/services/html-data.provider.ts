import { IRepositoryPool } from '@blue-paper/server-repository';
import { HtmlData, PaperInfo } from './entities';

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
