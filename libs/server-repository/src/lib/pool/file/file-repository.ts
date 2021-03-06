import { SubRepository } from '../sub-repository';
import {
  SQL_FIND_FILE_BY_GROUP_AND_FILENAME,
  SQL_FIND_FILE_BY_ID,
  SQL_INSERT_FILE,
  SQL_SELECT_IMAGE_LIST_FROM_MENU_GROUP
} from './file-repository.sql';
import { IDbFile } from './file.entity';
import { IDbInsertFile } from './insert-file.entity';

/**
 * The repository of the table `files`.
 */
export class FileRepository extends SubRepository {

  async findFileByGroupAndFilename(groupId: number, filename: string): Promise<IDbFile> {
    return await this.conn.selectOne<IDbFile>(SQL_FIND_FILE_BY_GROUP_AND_FILENAME, {groupId, filename});
  }

  async findFileById(fileId: number): Promise<IDbFile> {
    return await this.conn.selectOne<IDbFile>(SQL_FIND_FILE_BY_ID, {fileId});
  }

  async insertFile(values: IDbInsertFile): Promise<number> {
    return await this.conn.insert(SQL_INSERT_FILE, values);
  }

  async getImageListFromMenuGroup(menuId: number, groupId: number): Promise<IDbFile[]> {
    return await this.conn.select<IDbFile>(SQL_SELECT_IMAGE_LIST_FROM_MENU_GROUP, {menuId, groupId});
  }
}
