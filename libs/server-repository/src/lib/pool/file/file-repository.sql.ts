import { DbFile, NL } from '../repository.names';

export const SQL_FIND_FILE_BY_GROUP_AND_FILENAME = [
  'SELECT file_id AS id, menu_id AS menuId, group_id AS groupId, filename, mimetype, etag, size', NL,
  'FROM ', DbFile, NL,
  'WHERE group_id = {groupId} AND filename = {filename}'
].join('');

export const SQL_FIND_FILE_BY_ID = [
  'SELECT file_id AS id, menu_id AS menuId, group_id AS groupId, filename, mimetype, etag, size', NL,
  'FROM ', DbFile, NL,
  'WHERE file_id = {fileId}'
].join('');


/**
 *
 * @see {@link IDbInsertFile}
 */
export const SQL_INSERT_FILE = [
  'INSERT ', 'INTO ', DbFile, NL,
  '  (menu_id, group_id, filename, mimetype, etag, size)', NL,
  'VALUES({menuId}, {groupId}, {filename}, {mimetype}, {etag}, {size})'
].join('');
