import { Injectable } from '@angular/core';
import { PathName } from '@blue-paper/ui-commons';
import { TreeNodeSection } from '@blue-paper/ui-components';
import { BpaTreeKind, BpaTreeMenu } from '@blue-paper/ui-editor-backend';
import { NavigateActions } from '@blue-paper/ui-store-editor';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuActions, MenuQueries } from './store/menu';
import { MenuPartialState } from './store/menu/menu.reducer';

@Injectable()
export class EditorBureauStateService {

  constructor(private store: Store<MenuPartialState>) {
  }

  get getMenuList$(): Observable<TreeNodeSection[]> {
    return this.store
      .pipe(
        select(MenuQueries.getMenuList$),
        filter(m => !!m),
      );
  }

  /**
   * Initialized the
   */
  initView(): void {
    this.store.dispatch(MenuActions.initMenuList());
  }

  navigateMenuDetail(menu: BpaTreeMenu): void {
    if (menu && menu.kind !== BpaTreeKind.Folder) {
      this.store.dispatch(NavigateActions.navigate({
        pathSegments: [
          PathName.Root, PathName.Home, PathName.Editor, PathName.Detail, menu.menuId
        ]
      }));
    }
  }
}
