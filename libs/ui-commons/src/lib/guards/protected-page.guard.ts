import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PathName } from '../models';
import { AuthenticationService } from '../services';
import { NavigateUtil } from '../util';

/**
 * The view / page / route needs an logged in user.
 */
@Injectable()
export class ProtectedPageGuard implements CanActivate {

  constructor(private router: Router, private authentication: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authentication.hasToken()) {
      // redirect to the login view
      NavigateUtil.navigate(this.router, PathName.Root, PathName.Login);
      return false;
    }
    return true;
  }
}
