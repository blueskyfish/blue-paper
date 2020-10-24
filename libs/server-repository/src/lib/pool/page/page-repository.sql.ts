import { DbPage, NL } from '../repository.names';

export const SQL_FIND_PAGE_BY_ID = [
  'SELECT page_id AS id, title, content, creation, modified', NL,
  'FROM ', DbPage, NL,
  'WHERE page_id = {pageId}'
].join('');
