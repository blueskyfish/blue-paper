import { Enabled } from '../models';

export const NL = '\n';

/**
 * The table name of the menu repository.
 */
export const DbMenu = '`menus`';

/**
 * The table name of the page repository
 * @deprecated
 */
export const DbPage = '`pages`';

/**
 * The table name of the group content repository
 */
export const DbGroup = '`groups`';

/**
 * The table name of the file repository.
 */
export const DbFile = '`files`';

/**
 * The table name of the user repository.
 */
export const DbUser = '`editor_users`';

/**
 * The table name of the user-salt repository.
 */
export const DbUserSalt = '`editor_user_salts`';

/**
 * The value of enabled = `Y`.
 */
export const ENABLED = `'${Enabled.Yes}'`;
