import { DbConnection } from '@blue-paper/server-database';
import { isNil } from '@blue-paper/shared-commons';
import { FileRepository } from './file';
import { MenuRepository } from './menu';
import { PageRepository } from './page';
import { IRepositoryPool } from './repository';
import { UserRepository } from './user';

/**
 * The repository pool
 */
export class RepositoryPool implements IRepositoryPool {

  private _file: FileRepository = null;
  private _menu: MenuRepository = null;
  private _page: PageRepository = null;
  private _user: UserRepository = null;

  constructor(private _conn: DbConnection) {
  }

  get conn(): DbConnection {
    return this._conn;
  }

  get file(): FileRepository {
    return isNil(this._file) ?
      (this._file = new FileRepository(this.conn)) : this._file;
  }

  /**
   * The sub repository works with the menu entities
   *
   * @returns {MenuRepository}
   */
  get menu(): MenuRepository {
    return isNil(this._menu) ?
      (this._menu = new MenuRepository(this.conn)) : this._menu;
  }

  get page(): PageRepository {
    return isNil(this._page) ?
      (this._page = new PageRepository(this.conn)) : this._page;
  }

  get user(): UserRepository {
    return isNil(this._user) ?
      (this._user = new UserRepository(this.conn)) : this._user;
  }

  /**
   * @see {@link DbConnection.startTransaction}
   */
  async startTransaction(): Promise<void> {
    await this.conn.startTransaction();
  }

  /**
   * @see {@link DbConnection.commit}
   */
  async commit(): Promise<boolean> {
    return await this.conn.commit();
  }

  /**
   * @see {@link DbConnection.rollback}
   */
  async rollback(): Promise<boolean> {
    return await this.conn.rollback();
  }


  close(): void {
    if (this._menu) {
      this._menu.close();
      this._menu = null;
    }
    if (this._page) {
      this._page.close();
      this._page = null;
    }
    if (this._user) {
      this._user.close();
      this._user = null;
    }
    this._conn = null;
  }
}
