import { isEmpty, isNil } from '@blue-paper/shared-commons';
import { NodeMenuItem, NodeMenuSection } from '@blue-paper/ui-components';
import { BpaEditorMenuItem, BpaMenuPlace } from '@blue-paper/ui-editor-backend';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuFeatureKey, MenuState } from './menu.reducer';

const selectMenu = createFeatureSelector<MenuState>(MenuFeatureKey);

export class MenuQueries {

  /**
   * Check if the menu list is empty
   */
  static isMenuEmpty$ = createSelector(
    selectMenu,
    (state: MenuState) => isEmpty(state)
  );

  static getMenuList$ = createSelector(
    selectMenu,
    (state: MenuState): BpaEditorMenuItem[] => {
      if (isEmpty(state)) {
        return null;
      }
      return state;
    }
  );

  /**
   * Get the data from given menu id
   *
   * @param {number} menuId the menu id
   */
  static getMenuDetailFrom$ = (menuId: number) => createSelector(
    selectMenu,
    (state: MenuState): BpaEditorMenuItem => {
      if (isEmpty(state)) {
        return null;
      }
      // not found menu
      return state.find((m: BpaEditorMenuItem) => m.menuId === menuId);
    }
  )
}
