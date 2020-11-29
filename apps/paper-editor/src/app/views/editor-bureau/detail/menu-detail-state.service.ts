import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { TextContent, MenuContent } from '@blue-paper/ui-components';
import { BpaEditorMenuItem } from '@blue-paper/ui-editor-backend';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MenuQueries } from '../store/menu';
import { MenuPartialState } from '../store/menu/menu.reducer';

@Injectable()
export class MenuDetailStateService {

  constructor(private store: Store<MenuPartialState>) {
  }

  /**
   * GEt the menu detail content from the given menu id.
   * @param {number} menuId the menu id
   * @returns {Observable<[MenuContent, TextContent]>} the content (first **menu**, second: **text**)
   */
  getMenuDetailFrom$(menuId: number): Observable<any> {
    return this.store
      .pipe(
        select(MenuQueries.getMenuDetailFrom$(menuId)),
        filter(d => !isNil(d)),
        map((item: BpaEditorMenuItem) => {
          const menu: MenuContent = {
            menuId: item.menuId,
            title: item.title,
            pageUrl: item.pageUrl,
            template: item.template,
            place: item.place,
            enabled: item.enabled,
            ordering: item.ordering,
            roles: item.roles,
          };

          const text: TextContent = {
            menuId: item.menuId,
            template: item.template,
            title: item.group.title,
            author: item.group.author,
            creation: item.group.creation,
            modified: item.group.modified,
            groupId: item.group.groupId,
          };

          return [
            menu,
            text,
          ]
        })
      );
  }

  saveMenuDetail(menuId: number, menu: MenuContent): void {

  }
}
