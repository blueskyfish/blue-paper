import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { MessageActions } from './message.actions';

/**
 * create an error message from the http error catch
 * @param {string} message the error message
 * @returns {(reason: any) => Observable<Action>}
 */
export const processCatch = (message: string = null) => (reason: any): Observable<Action> => {
  const action = buildError(message, reason);
  if (action) {
    return of(action);
  }
  return EMPTY;
};

export const buildError = (message: string, reason: any) => {
  if (reason instanceof HttpErrorResponse) {

    const data = {
      status: reason.status,
      title: reason.statusText,
      message: reason.message
    }

    if (reason.status >= 500) {
      // server not found
      return MessageActions.appendError({
        message: {
          kind: 'error',
          title: 'app.error.server.notAvailable.title',
          message,
          data
        }
      });
    }
    if (reason.status >= 400 && reason.status < 500) {
      const title = `app.error.response.${reason.status}.title`;
      return MessageActions.appendError({
        message: {
          kind: 'error',
          title,
          message,
          data
        }
      })
    }

    return MessageActions.appendError({
      message: {
        kind: 'error',
        title: 'app.error.response.unknown.title',
        message,
        data
      }
    });
  }

  return null;
};
