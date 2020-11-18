import { Request } from 'express';
import { AUTHENTICATION_GROUP } from '../authentication.const';
import { AuthUser } from '../entities';
import { isNil } from '@blue-paper/shared-commons';
import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthUtil } from './auth.util';

/**
 * Internal function for check user whether her has the roles.
 *
 * @param authUser the authorized user
 * @param data the optional roles
 * @return `true` means, the user has the role(s)
 */
export function checkRoles(authUser: AuthUser, data: any | string | string[]): boolean {

  if (isNil(authUser) || authUser.id <= 0) {
    return false;
  }


  if (typeof data === 'string') {
    return authUser.hasRole(data);
  }
  if (Array.isArray(data)) {
    const checkResult = data.some((role: string) => authUser.hasRole(role));
    if (!checkResult) {
      return false;
    }
  }
  return true;
}

/**
 * Extract the auth user from the request. If the auth user is not exist, then it is returns an dummy user.
 *
 * If the data parameter is set (as role name or as list of role names), then it is / are checked
 */
export const Auth = createParamDecorator((data: any, ctx: ExecutionContext): AuthUser => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const authUser = AuthUtil.getAuthUser(req);
  if (data) {
    if (!checkRoles(authUser, data)) {
      throw new ForbiddenException(`${AUTHENTICATION_GROUP}: Missing role(s)`);
    }
  }
  return authUser;
});
