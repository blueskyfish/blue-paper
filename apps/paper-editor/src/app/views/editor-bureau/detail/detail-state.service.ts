import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { BpaTreeMenu } from '@blue-paper/ui-editor-backend';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuQueries } from '../store/menu';
import { MenuPartialState } from '../store/menu/menu.reducer';

@Injectable()
export class DetailStateService {

  constructor(private store: Store<MenuPartialState>) {
  }

  getMenuDetailFrom$(menuId: number): Observable<BpaTreeMenu> {
    return this.store
      .pipe(
        select(MenuQueries.getMenuDetailFrom$(menuId)),
        filter(d => !isNil(d))
      );
  }
}
