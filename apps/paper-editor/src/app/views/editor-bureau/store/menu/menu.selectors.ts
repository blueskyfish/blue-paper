import { isEmpty, isNil } from '@blue-paper/shared-commons';
import { idGenerator, IdGenerator, TreeNodeItem, TreeNodeSection } from '@blue-paper/ui-components';
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
          let children: TreeNodeItem[] = null;
          if (!isEmpty(rootMenu.children)) {
            children = MenuQueries.buildTreeMenu(idGen, rootMenu.children);
          }

          return new TreeNodeSection(idGen.next, rootMenu.place, children);
        })
    }
  );

  /**
   * Get the data from given menu id
   *
   * @param {number} menuId the menu id
   */
  static getMenuDetailFrom$ = (menuId: number) => createSelector(
    selectMenu,
    (state: MenuState) => {

      if (!isEmpty(state)) {
        for(const place of state) {
          if (!isEmpty(place.children)) {
            const founded = MenuQueries.findTreeMenu(menuId, place.children);
            if (!isNil(founded)) {
              return founded;
            }
          }
        }
      }
      // not found menu
      return null;
    }
  )

  private static buildTreeMenu = (idGen: IdGenerator, menuList: BpaTreeMenu[]): TreeNodeItem[] => {
    return menuList
      .map((menu: BpaTreeMenu) => {

        let children: TreeNodeItem[] = null;
        if (!isEmpty(menu.children)) {
          // build the children menu
          children = MenuQueries.buildTreeMenu(idGen, menu.children);
        }

        return new TreeNodeItem(idGen.next, menu, children);
      });
  }

  private static findTreeMenu = (menuId: number, children: BpaTreeMenu[]): BpaTreeMenu => {
    for (const item of children) {
      if (item.menuId === menuId) {
        return item;
      }
      if (!isEmpty(item.children)) {
        const founded = MenuQueries.findTreeMenu(menuId, item.children);
        if (!isNil(founded)) {
          return founded;
        }
      }
    }
    return null;
  }
}
