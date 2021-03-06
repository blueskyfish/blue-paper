import { HttpErrorResponse } from '@angular/common/http';
import { get } from '@blue-paper/shared-commons';
import { IMessage } from '@blue-paper/ui-store-editor';
import { Action } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { MessageActions } from './message.actions';

/**
 * create an error message from the http error catch
 * @param {string} category the message category.
 * @param {string} message the error message
 * @returns {(reason: any) => Observable<Action>}
 */
export const processCatch = (category: string, message: string = null) => (reason: any): Observable<Action> => {
  const action = buildError(category, message, reason);
  if (action) {
    return of(action);
  }
  return EMPTY;
};

export const buildError = (category: string, message: string, reason: any) => {
  if (reason instanceof HttpErrorResponse) {
    const msg = errorMessageFrom(reason, message);
    if (msg) {
      return MessageActions.appendError({
        message: {
          category,
          ...msg,
        } as IMessage,
      });
    }
  }
};

export function errorMessageFrom(reason: any, message: string): Partial<IMessage> {

  if (reason instanceof HttpErrorResponse) {

    const data = {
      status: reason.status,
      title: reason.statusText,
      message: get(reason, 'error.message', reason.message)
    };

    if (reason.status >= 500) {
      // server not found
      return {
        kind: 'error',
        title: 'app.error.server.notAvailable.title',
        message,
        data
      };
    }
    if (reason.status >= 400 && reason.status < 500) {
      const title = `app.error.response.${reason.status}.title`;
      return {
        kind: 'error',
        title,
        message,
        data
      };
    }

    return {
      kind: 'error',
      title: 'app.error.response.unknown.title',
      message,
      data
    };
  }

  return {
    kind: 'error',
    message,
    data: {
      reason,
    }
  };
}
