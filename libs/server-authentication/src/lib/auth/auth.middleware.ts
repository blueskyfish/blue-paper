import { AUTHENTICATION_GROUP, HTTP_AUTH_HEADER } from '../authentication.const';
import { AuthService } from './auth.service';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthUtil } from './auth.util';

/**
 * The middleware verify the request and build the auth user.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private authService: AuthService) {
  }

  use(req: Request, res: Response, next: NextFunction): any {
    const token = req.header(HTTP_AUTH_HEADER);

    if (token && token !== '') {
      try {
        // try to extract from the token the AuthUser and put it an the req instance.
        const authUser = this.authService.parseToken(token);
        AuthUtil.setAuthUser(req, authUser);

      } catch (e) {
        return next(e);
      }

      // continues
      return next();
    }

    // The request needs an authorization header
    next(
      new UnauthorizedException(`${AUTHENTICATION_GROUP}: Only authenticated users / requests are accepted`)
    );
  }
}
