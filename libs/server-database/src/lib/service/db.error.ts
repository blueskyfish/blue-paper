import { MysqlError } from 'mysql';
import { MysqlUtil } from './mysql/mysql.util';

export const DB_ERROR_GROUP = 'db';

export class DbError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly sql?: string,
    public readonly stack?: string
  ) {
    super(message);
  }
}

export const transactionError = (err: MysqlError): DbError => {
  const code = MysqlUtil.adjustAndLower(err.code, '.');
  const message = err.sqlMessage;

  return new DbError(`transaction.${code}`, message);
};

/**
 * Create a DB error for query request to the database. The error code has the prefix **query**.
 * @param {MysqlError} err the error of the database
 * @returns {DbError} the db error
 */
export const queryError = (err: MysqlError): DbError => {
  const code = MysqlUtil.adjustAndLower(err.code, '.');
  const message = err.sqlMessage;
  const sql = err.sql;

  return new DbError(`query.${code}`, message, sql, err.stack);
};

export const connectError = (err: MysqlError): DbError => {
  const code = MysqlUtil.adjustAndLower(err.code, '.');
  const message = err.sqlMessage;

  return new DbError(`connect.${code}`, message);
};
