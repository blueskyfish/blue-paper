import { DbUser, DbUserSalt, ENABLED, NL } from '../repository.names';


const SQL_FIND_USER_BY_EMAIL = [
  'SELECT u.user_id AS userId, u.name, u.email, u.password, u.roles, IFNULL(s.salt, \'-\') AS salt', NL,
  'FROM ', DbUser, ' AS u', NL,
  '  LEFT JOIN ', DbUserSalt, ' AS s ON (u.user_id = s.user_id)', NL,
  'WHERE u.email = {email} AND u.enabled = ', ENABLED
].join('');


const SQL_FIND_USER_BY_ID = [
  'SELECT u.user_id AS userId, u.name, u.email, u.roles', NL,
  'FROM ', DbUser, ' AS u', NL,
  'WHERE user_id = {userId}'
].join('');

export const userSql = {

  /**
   * sql statement for user login
   */
  findUserByEmail: SQL_FIND_USER_BY_EMAIL,

  /**
   * sql statement for user information
   */
  findUserById: SQL_FIND_USER_BY_ID,
};
