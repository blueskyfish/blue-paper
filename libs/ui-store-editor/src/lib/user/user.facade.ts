import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { BpaLoginPayload } from '@blue-paper/ui-editor-backend';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { UserActions } from './user.actions';
import { IUserName } from './user.entities';
import { UserPartialState } from './user.reducer';
import { UserQuery } from './user.selectors';

@Injectable()
export class UserFacadeService {

  get currentUserName$(): Observable<IUserName> {
    return this.store
      .pipe(
        select(UserQuery.selectUserName$),
        filter(user => !isNil(user))
      );
  }

  get snapshotUserName$(): Observable<IUserName> {
    return this.store
      .pipe(
        select(UserQuery.selectUserName$),
        first()
      );
  }

  get snapshotUserAvailable$(): Observable<boolean> {
    return this.store
      .pipe(
        select(UserQuery.selectUserAvailable$),
        first()
      );
  }

  constructor(
    private store: Store<UserPartialState>
  ) {
  }

  login(payload: BpaLoginPayload): void {
    this.store.dispatch(UserActions.sendLogin({payload}));
  }
}
