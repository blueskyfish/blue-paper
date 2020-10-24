import { SubRepository } from '../sub-repository';
import { SQL_FIND_PAGE_BY_ID } from './page-repository.sql';
import { IDbPage } from './page.entiy';

export class PageRepository extends SubRepository {

  async findPage(pageId: number): Promise<IDbPage> {
    return this.conn.selectOne<IDbPage>(SQL_FIND_PAGE_BY_ID, {pageId});
  }
}
