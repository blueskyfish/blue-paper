import { DbConnection } from '@blue-paper/server-database';
import { IRepository } from './repository';

export class SubRepository implements IRepository {

  constructor(private _conn: DbConnection) {
  }

  get conn(): DbConnection {
    return this._conn;
  }

  close() {
    this._conn = null;
  }
}
