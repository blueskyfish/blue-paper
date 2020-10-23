import { DbConnection } from '@blue-paper/server-database';
import { isNil } from '@blue-paper/shared-commons';
import { MenuRepository } from './menu';
import { IRepositoryPool } from './repository';

/**
 * The repository pool
 */
export class RepositoryPool implements IRepositoryPool {

  private _menu: MenuRepository = null;

  constructor(private _conn: DbConnection) {
  }

  get conn(): DbConnection {
    return this._conn;
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
    this._conn = null;
  }
}
