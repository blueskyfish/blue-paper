import { DbMenu, ENABLED, NL } from '../repository.names';

/**
 *
 * @see {@link IdbMenu}
 */
export const SQL_FIND_MENU_BY_PAGE_URL = [
  'SELECT menu_id AS id, page_url AS pageUrl, title, template, ordering, group_id AS groupId, place, roles', NL,
  'FROM ', DbMenu, NL,
  'WHERE page_url = {pageUrl} AND enabled = ', ENABLED
].join('');

/**
 *
 * @see {@link IdbMenu}
 */
export const SQL_SELECT_MENU_LIST = [
  'SELECT menu_id AS id, page_url AS pageUrl, title, template, ordering, group_id AS groupId, place, roles', NL,
  'FROM ', DbMenu, NL,
  'WHERE enabled = ', ENABLED, NL,
  'ORDER BY place, ordering'
].join('');
