import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PathName } from '../models';
import { AuthenticationService } from '../services';
import { NavigateUtil } from '../util';

/**
 * Check the current routing and if the user is logged in, then it redirect to the home view
 */
@Injectable()
export class RedirectPageGuard implements CanActivate {

  constructor(private router: Router, private authentication: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authentication.hasToken()) {
      // redirect to the home view
      NavigateUtil.navigate(this.router, PathName.Root, PathName.Home);
      return false;
    }
    return true;
  }
}
