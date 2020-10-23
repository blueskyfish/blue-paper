import { IDatabaseConnection } from '@blue-paper/server-database';
import { MenuRepository } from './menu';

/**
 * A repository interface
 */
export interface IRepository {

  /**
   * Readonly of the database connection
   */
  readonly conn: IDatabaseConnection;

  /**
   * Close the database connection (release and set null)
   */
  close(): void;
}

/**
 * The interface for the repository pool.
 */
export interface IRepositoryPool extends IRepository {

  /**
   * The sub repository works with the menu entities
   *
   * @returns {MenuRepository}
   */
  readonly menu: MenuRepository;

  /**
   * @see {@link DbConnection.startTransaction}
   */
  startTransaction(): Promise<void>;

  /**
   * @see {@link DbConnection.commit}
   */
  commit(): Promise<boolean>;

  /**
   * @see {@link DbConnection.rollback}
   */
  rollback(): Promise<boolean>;
}
