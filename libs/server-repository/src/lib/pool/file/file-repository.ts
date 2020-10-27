import { SubRepository } from '../sub-repository';
import { SQL_FIND_FILE_BY_GROUP_AND_FILENAME, SQL_INSERT_FILE } from './file-repository.sql';
import { IDbFile } from './file.entity';
import { IDbInsertFile } from './insert-file.entity';

export class FileRepository extends SubRepository {

  async findFileByGroupAndFilename(groupId: number, filename: string): Promise<IDbFile> {
    return await this.conn.selectOne<IDbFile>(SQL_FIND_FILE_BY_GROUP_AND_FILENAME, {groupId, filename});
  }

  async insertFile(values: IDbInsertFile): Promise<number> {
    return await this.conn.insert(SQL_INSERT_FILE, values);
  }
}
