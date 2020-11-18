import { Injectable } from '@angular/core';
import { DialogService } from '@blue-paper/ui-components';
import { AppState, UserActions } from '@blue-paper/ui-store-editor';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogoutConfirmComponent, LogoutDialogResult } from './logout-confirm/logout-confirm.component';


@Injectable()
export class LogoutDialogService {

  constructor(
    private dialog: DialogService,
    private store: Store<AppState>) {
  }

  confirmLogout(): Observable<boolean> {

    return this.dialog.open<LogoutDialogResult>(LogoutConfirmComponent, {}, {disableClose: false})
      .dismiss$
      .pipe(
        map((result: LogoutDialogResult) => {

          if (result !== LogoutDialogResult.Logout) {
            return false;
          }

          this.store.dispatch(UserActions.logoutUser());

          return true;
        })
      );
  }
}
