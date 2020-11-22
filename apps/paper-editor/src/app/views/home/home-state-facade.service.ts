import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { PathName } from '@blue-paper/ui-commons';
import { ToolButtonItem } from '@blue-paper/ui-components';
import { AppState, NavigateActions, UserQueries } from '@blue-paper/ui-store-editor';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LogoutDialogService } from '../../dialogs/logout-dialog.service';
import { TOOL_BUTTON_LIST } from './home-view.models';

@Injectable()
export class HomeStateFacadeService {

  constructor(
    private logoutDialog: LogoutDialogService,
    private store: Store<AppState>
  ) {
  }

  /**
   * Get the list of buttons for the side toolbar.
   * @returns {Observable<ToolButtonItem[]>}
   */
  getToolButtonList$(): Observable<ToolButtonItem[]> {
    return this.store
      .pipe(
        select(UserQueries.selectUserRoles$),
        filter(r => !isNil(r)),
        map((roles: string[]) => {

          return TOOL_BUTTON_LIST
            .filter((t) => {
              //console.log('>> Debug: %s =>', roles.join(','), t);
              if (isNil(t.role)) {
                return true;
              }
              return roles.includes(t.role);
            })
            .map((t) => {
              return t.button;
            });
        })
      );
  }

  /**
   * Navigate to the editor bureau
   */
  navigateToEditor(): void {
    this.store.dispatch(NavigateActions.navigate({
      pathSegments: [ PathName.Root, PathName.Home, PathName.Editor]
    }));
  }

  navigateToDashboard(): void {
    this.store.dispatch(NavigateActions.navigate({
      pathSegments: [ PathName.Root, PathName.Home]
    }));
  }

  confirmLogout(): void {
    this.logoutDialog.confirmLogout()
      .subscribe((result) => console.log('> Debug: User logout %s', result));
  }
}
