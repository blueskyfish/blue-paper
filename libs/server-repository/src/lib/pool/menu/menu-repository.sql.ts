import { DbGroup, DbMenu, DbUser, ENABLED, NL } from '../repository.names';

const MENU_FIELDS = 'menu_id AS menuId, page_url AS pageUrl, title, template, ordering, group_id AS groupId, place, roles, enabled';

/**
 * @see {@link IdbMenu}
 */
export const SQL_FIND_MENU_BY_PAGE_URL = [
  'SELECT ', MENU_FIELDS, NL,
  'FROM ', DbMenu, NL,
  'WHERE page_url = {pageUrl} AND enabled = ', ENABLED
].join('');

/**
 * @see {@link IdbMenu}
 */
export const SQL_SELECT_MENU_LIST = [
  'SELECT ', MENU_FIELDS, NL,
  'FROM ', DbMenu, NL,
  'WHERE enabled = ', ENABLED, NL,
  'ORDER BY place, ordering'
].join('');

/**
 * Select the menu items with there group content information
 *
 * @see {@link IDbMenuGroup}
 */
export const SQL_SELECT_EDITOR_MENU_GROUP_LIST = [
  'SELECT m.menu_id AS menuId, m.page_url AS pageUrl, m.title, m.template, m.ordering, m.place, m.roles, m.enabled,', NL,
  '  g.group_id AS groupId, g.title AS groupTitle, g.creation, g.modified, g.status,', NL,
  '  u.user_id AS authorId, u.name AS authorName', NL,
  'FROM ', DbMenu, ' AS m', NL,
  '  LEFT JOIN ', DbGroup, ' AS g ON (m.group_id = g.group_id)', NL,
  '  JOIN ', DbUser, ' AS u ON (g.author_id = u.user_id)', NL,
  'ORDER BY m.place, m.ordering'
].join('');
