import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { AuthStorageService, PathName } from '@blue-paper/ui-commons';
import { IMessageText } from '@blue-paper/ui-components';
import { BpaLoginPayload, BureauUserService } from '@blue-paper/ui-editor-backend';
import { errorMessageFrom, NavigateActions, UserActions, UserPartialState } from '@blue-paper/ui-store-editor';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * The default message for the login
 *
 * @type {IMessageText}
 */
export const DEFAULT_MESSAGE: IMessageText = {
  kind: 'info',
  text: 'app.login.message.text'
};

/**
 * Manages the login process. If an error has occurred the message text is updated with the error description.
 */
@Injectable()
export class LoginViewService extends ComponentStore<IMessageText> {

  constructor(
    private authStorage: AuthStorageService,
    private store: Store<UserPartialState>,
    private userService: BureauUserService
  ) {
    super({ ...DEFAULT_MESSAGE });
  }

  /**
   * Get the message
   * @type {Observable<IMessageText>}
   */
  readonly message$: Observable<IMessageText> = this.select(state => state)
    .pipe(
      map(msg => (isNil(msg) ? DEFAULT_MESSAGE : msg))
    );

  /**
   * Send the login credentials to the backend.
   *
   * * In case of success, the user info is stored in the user state and redirect to the home view.
   * * In case of error, an error message is shown.
   */
  sendLogin(payload: BpaLoginPayload): Observable<boolean> {
    return this.userService.sendLogin({ body: payload })
      .pipe(
        map(({ token, user }) => {
          this.authStorage.updateToken(token);
          this.store.dispatch(UserActions.userInfo(user));
          this.store.dispatch(NavigateActions.navigate({ paths: [ PathName.Root, PathName.Home ] }));
          return true;
        }),
        catchError((reason) => {
          const { title, message } = errorMessageFrom(reason, 'app.error.login.message');
          this.addMessage({
            kind: 'error',
            title,
            text: message
          });
          return of(false);
        })
      )
  }

  /**
   * Add a message to the state
   *
   * @param {IMessageText} msg the new message. If the msg is null, then it set the default message.
   */
  private addMessage(msg: IMessageText): void {
    this.setState(isNil(msg) ? DEFAULT_MESSAGE : msg);
  }
}
