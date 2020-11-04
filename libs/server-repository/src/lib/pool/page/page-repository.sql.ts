import { DbPage, NL } from '../repository.names';

/**
 * Statement for find the page entity from the given page id
 * @see {@link IDbPage}
 */
export const SQL_FIND_PAGE_BY_ID = [
  'SELECT page_id AS pageId, title, content, creation, modified', NL,
  'FROM ', DbPage, NL,
  'WHERE page_id = {pageId}'
].join('');
