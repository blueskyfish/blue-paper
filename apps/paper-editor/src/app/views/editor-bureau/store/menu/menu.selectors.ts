import { isEmpty } from '@blue-paper/shared-commons';
import { idGenerator, IdGenerator, TreeMenuItem, TreeMenuItemKind, TreeNodeSection } from '@blue-paper/ui-components';
import { BpaTreeMenu, BpaTreeRootMenu } from '@blue-paper/ui-editor-backend';
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
    (state: MenuState) => {
      if (isEmpty(state)) {
        return null;
      }
      return state
        .map((rootMenu: BpaTreeRootMenu) => {

          const idGen = idGenerator();
          let children: TreeMenuItem[] = null;
          if (!isEmpty(rootMenu.children)) {
            children = MenuQueries.buildTreeMenu(idGen, rootMenu.children);
          }

          return new TreeNodeSection(idGen.next, rootMenu.place, children);
        })
    }
  );

  static buildTreeMenu = (idGen: IdGenerator, menuList: BpaTreeMenu[]): TreeMenuItem[] => {
    return menuList
      .map((menu: BpaTreeMenu) => {

        let children: TreeMenuItem[] = null;
        if (!isEmpty(menu.children)) {
          // build the children menu
          children = MenuQueries.buildTreeMenu(idGen, menu.children);
        }

        // kind and data ()
        const kind = (menu.menuId < 0) ? TreeMenuItemKind.Path : TreeMenuItemKind.Page;
        const data = (menu.menuId < 0) ? null : menu;

        return new TreeMenuItem(idGen.next, kind, menu.title, data, children);
      });
  }
}
