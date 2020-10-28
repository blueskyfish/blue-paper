import { DbConnection } from '@blue-paper/server-database';
import { FileRepository } from './file';
import { MenuRepository } from './menu';
import { PageRepository } from './page';

/**
 * A repository interface
 */
export interface IRepository {

  /**
   * Readonly of the database connection
   */
  readonly conn: DbConnection;

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
   * The sub repository works with the file entities
   */
  readonly file: FileRepository;

  /**
   * The sub repository works with the menu entities
   */
  readonly menu: MenuRepository;

  /**
   * The sub repository works with the page entities
   */
  readonly page: PageRepository;

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
