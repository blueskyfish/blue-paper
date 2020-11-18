import { LogService } from '@blue-paper/server-commons';
import { DbService } from '@blue-paper/server-database';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { IRepositoryPool, RepositoryPool } from './pool';
import { REPOSITORY_GROUP } from './repository.constants';

@Injectable()
export class RepositoryService {

  constructor(
    private log: LogService,
    private dbService: DbService
  ) {
  }
  /**
   * execute the business callback function.
   * @param {(rep: IRepositoryPool) => Promise<T>} businessFunc The business function with the repository pool.
   * @returns {Promise<T>}
   */
  async execute<T>(businessFunc: (rep: IRepositoryPool) => Promise<T>): Promise<T> {
    const conn = this.dbService.getConnection();
    const rep = new RepositoryPool(conn);
    try {
      return await businessFunc(rep);
    } catch (e) {
      this.handleError(e);
    } finally {
      // close the repository
      rep.close();
      // release the connection
      await conn.release();
    }
  }

  private handleError(e): void {

    if (e.stack) {
      this.log.error(REPOSITORY_GROUP, `Error: \n${e.stack}`);
    }

    if (e instanceof HttpException) {
      throw e;
    }

    throw new BadRequestException(e.message, 'Repository error');
  }
}
