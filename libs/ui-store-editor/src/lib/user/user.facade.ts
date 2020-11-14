import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { BpaLoginPayload } from '@blue-paper/ui-editor-backend';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { AppState } from '../app.state';
import { IMessage, MessageActions, MessageQueries } from '../message';
import { UserActions } from './user.actions';
import { UserCategory } from './user.categories';
import { IUserName } from './user.entities';
import { UserQueries } from './user.selectors';

@Injectable()
export class UserFacadeService {

  get currentUserName$(): Observable<IUserName> {
    return this.store
      .pipe(
        select(UserQueries.selectUserName$),
        filter(user => !isNil(user))
      );
  }

  get snapshotUserName$(): Observable<IUserName> {
    return this.store
      .pipe(
        select(UserQueries.selectUserName$),
        first()
      );
  }

  get snapshotUserAvailable$(): Observable<boolean> {
    return this.store
      .pipe(
        select(UserQueries.selectUserAvailable$),
        first()
      );
  }

  /**
   * Observe to the error messages of category {@link UserCategory.Login} and returns the first
   * @returns {Observable<IMessage>}
   */
  get getLoginError$(): Observable<IMessage> {
    return this.store
      .pipe(
        select(MessageQueries.selectMessage(UserCategory.Login)),
        map((list: IMessage[]) => {
          return Array.isArray(list) && list.length > 0 ? list[0] : null;
        })
      );
  }

  constructor(
    private store: Store<AppState>
  ) {
  }

  /**
   * Login view is initialized
   */
  loginInit(): void {
    this.store.dispatch(MessageActions.removeCategory({category: UserCategory.Login}));
  }

  /**
   * Close and remove the error messages from category {@link UserCategory.Login}.
   */
  closeLoginError(): void {
    this.store.dispatch(MessageActions.removeCategory({category: UserCategory.Login}));
  }

  /**
   * Send the login credentials
   *
   * @param {BpaLoginPayload} payload the payload with email and password
   */
  login(payload: BpaLoginPayload): void {
    this.store.dispatch(UserActions.sendLogin({payload}));
  }
}
