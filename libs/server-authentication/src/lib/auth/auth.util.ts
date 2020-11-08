import { Request } from 'express';
import { AuthUser } from '../entities';

const DUMMY: AuthUser  = new AuthUser({ id: -1, roles: []});

export class AuthUtil {

  /**
   * Extract the auth user from the request or if the auth user is not exist, then it is return an dummy user.
   *
   * **NOTE**: It is never return `null` or `undefined`
   *
   * @param {e.Request} req the current express request
   * @returns {IAuthUser} the auth user
   */
  static getAuthUser(req: Request): AuthUser {
    return (req as any).authUser || DUMMY;
  };

  static setAuthUser(req: Request, authUser: AuthUser): void {
    (req as any).authUser = authUser;
  }
}
