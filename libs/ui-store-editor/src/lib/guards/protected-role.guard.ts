import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isNil } from '@blue-paper/shared-commons';
import { UserPartialState, UserQueries } from '../user';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

/**
 * Compare with the page role and the user role.
 */
@Injectable()
export class ProtectedRoleGuard {

  constructor(private store: Store<UserPartialState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const role = route.data.role || null;
    if (isNil(role)) {
      console.log('> Info: Route has no role!');
      return of(false);
    }

    return this.store
      .pipe(
        select(UserQueries.selectUserRoles$),
        filter(r => !isNil(r)),
        map((roles: string[]) => {
          return Array.isArray(roles) && roles.includes(role);
        }),
        first()
      );
  }
}
