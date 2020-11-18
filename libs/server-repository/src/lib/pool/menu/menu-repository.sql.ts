import { DbMenu, ENABLED, NL } from '../repository.names';

const MENU_FIELDS = 'menu_id AS id, page_url AS pageUrl, title, template, ordering, group_id AS groupId, place, roles';

/**
 *
 * @see {@link IdbMenu}
 */
export const SQL_FIND_MENU_BY_PAGE_URL = [
  'SELECT ', MENU_FIELDS, NL,
  'FROM ', DbMenu, NL,
  'WHERE page_url = {pageUrl} AND enabled = ', ENABLED
].join('');

/**
 *
 * @see {@link IdbMenu}
 */
export const SQL_SELECT_MENU_LIST = [
  'SELECT ', MENU_FIELDS, NL,
  'FROM ', DbMenu, NL,
  'WHERE enabled = ', ENABLED, NL,
  'ORDER BY place, ordering'
].join('');

/**
 * Select the menu items
 * @type {string}
 */
export const SQL_SELECT_EDITOR_MENU_LIST = [
  'SELECT ', MENU_FIELDS, NL,
  'FROM ', DbMenu, NL,
  'ORDER BY place, page_url',
].join('');
