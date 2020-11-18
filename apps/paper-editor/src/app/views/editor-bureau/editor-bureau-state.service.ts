import { Injectable } from '@angular/core';
import { TreeNodeSection } from '@blue-paper/ui-components';
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
}
