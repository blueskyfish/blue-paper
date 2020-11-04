import { DbFile, NL } from '../repository.names';

const SELECT_FILE = 'SELECT file_id AS fileId, menu_id AS menuId, group_id AS groupId, filename, mimetype, etag, size';

export const SQL_FIND_FILE_BY_GROUP_AND_FILENAME = [
  SELECT_FILE, NL,
  'FROM ', DbFile, NL,
  'WHERE group_id = {groupId} AND filename = {filename}'
].join('');

export const SQL_FIND_FILE_BY_ID = [
  SELECT_FILE, NL,
  'FROM ', DbFile, NL,
  'WHERE file_id = {fileId}'
].join('');

export const SQL_SELECT_IMAGE_LIST_FROM_MENU_GROUP = [
  SELECT_FILE, NL,
  'FROM ', DbFile, NL,
  'WHERE menu_id = {menuId} AND group_id = {groupId}', NL,
  'ORDER BY creation'
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
