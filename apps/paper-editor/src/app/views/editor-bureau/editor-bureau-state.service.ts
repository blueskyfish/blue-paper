import { Injectable } from '@angular/core';
import { PathName } from '@blue-paper/ui-commons';
import { NodeMenuItem, NodeMenuSection } from '@blue-paper/ui-components';
import { BpaEditorMenuItem, BpaMenuPlace } from '@blue-paper/ui-editor-backend';
import { NavigateActions } from '@blue-paper/ui-store-editor';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuActions, MenuQueries } from './store/menu';
import { MenuPartialState } from './store/menu/menu.reducer';

/**
 * Manages the actions and listeners for the view **editor-bureau**
 */
@Injectable()
export class EditorBureauStateService {

  constructor(private store: Store<MenuPartialState>) {
  }

  get getMenuList$(): Observable<NodeMenuSection[]> {
    return this.store
      .pipe(
        select(MenuQueries.getMenuList$),
        filter(m => !!m),
        map(this.mapTo)
      );
  }

  /**
   * Initialized the view
   */
  initView(): void {
    this.store.dispatch(MenuActions.initMenuList());
  }

  navigateMenuDetail(menu: BpaEditorMenuItem): void {
    this.store.dispatch(NavigateActions.navigate({
      pathSegments: [
        PathName.Root, PathName.Home, PathName.Editor, PathName.Detail, menu.menuId
      ]
    }));
  }

  private mapTo(menu: BpaEditorMenuItem[]): NodeMenuSection[] {
    const menuList = {
      navbar: [],
      footer: [],
      hidden: [],
    }

    menu.forEach((item: BpaEditorMenuItem) => {
      menuList[item.place].push(new NodeMenuItem(item));
    });

    return [
      new NodeMenuSection(BpaMenuPlace.Navbar, menuList.navbar),
      new NodeMenuSection(BpaMenuPlace.Footer, menuList.footer),
      new NodeMenuSection(BpaMenuPlace.Hidden, menuList.hidden),
    ];
  }
}
