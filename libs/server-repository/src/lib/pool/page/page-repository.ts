import { SubRepository } from '../sub-repository';
import { SQL_FIND_PAGE_BY_ID } from './page-repository.sql';
import { IDbPage } from './page.entiy';

/**
 * The repository for the table `pages`.
 */
export class PageRepository extends SubRepository {

  /**
   * Find the page entity from the given page id
   * @param {number} pageId the page id
   * @returns {Promise<IDbPage>} not `null` means: the page entity exists
   */
  async findPage(pageId: number): Promise<IDbPage> {
    return this.conn.selectOne<IDbPage>(SQL_FIND_PAGE_BY_ID, {pageId});
  }
}
