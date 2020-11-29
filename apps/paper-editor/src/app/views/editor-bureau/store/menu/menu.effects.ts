import { Injectable } from '@angular/core';
import { BureauAdminService } from '@blue-paper/ui-editor-backend';
import { processCatch } from '@blue-paper/ui-store-editor';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MenuActions } from './menu.actions';
import { MenuPartialState } from './menu.reducer';
import { MenuQueries } from './menu.selectors';

@Injectable()
export class MenuEffectService {

  constructor(
    private actions$: Actions,
    private store: Store<MenuPartialState>,
    private adminService: BureauAdminService
  ) {
  }

  /**
   * Check if the menu is loaded (and if not, it will be loaded from the backend).
   */
  checkAndLoadTreeMenuList$ = createEffect(
    () =>
      this.actions$
        .pipe(
          ofType(MenuActions.initMenuList),
          withLatestFrom(this.isMenuEmpty$()),
          switchMap(([, isMenuEmpty]) => {

            if (isMenuEmpty) {
              // Should load the editor menu list...
              return this.adminService.getEditorMenuList()
                .pipe(
                  map(list => MenuActions.updateMenuList({ list })),
                  catchError(processCatch('editor-menu.list', 'app.error.editorMenu.treeRoot'))
                );
            }
            return EMPTY;
          })
        )
  );


  private isMenuEmpty$(): Observable<boolean> {
    return this.store
      .pipe(
        select(MenuQueries.isMenuEmpty$),
        first(),
      );
  }
}
