import { TreeMenu, TreeRootMenu } from '@blue-paper/server-editor-service';
import { IDbMenu, MenuPlace } from '@blue-paper/server-repository';
import { isNil } from '@blue-paper/shared-commons';

export class TreeMenuUtil {

  static append(menuMap: Map<MenuPlace, TreeMenu[]>, dbMenu: IDbMenu): void {

    const segments = dbMenu.pageUrl
      .split('/')
      .filter(s => !isNil(s) && s !== '');

    if (segments.length === 0) {
      return null;
    }

    const menuList = menuMap.get(dbMenu.place);

    TreeMenuUtil.insertMenu(dbMenu, segments, menuList);
  }

  private static insertMenu(dbMenu: IDbMenu, segments: string[], menuList: TreeMenu[]): void {
    const [first, ...paths] = segments;

    const hasMore = paths.length > 0;

    let treeMenu = menuList.find(menu => menu.path === first);
    if (isNil(treeMenu)) {
      treeMenu = {
        menuId: hasMore ? -1 : dbMenu.id,
        title: hasMore ? first : dbMenu.title,
        path: first,
        ordering: dbMenu.ordering,
        children: hasMore ? [] : null,
      };
      menuList.push(treeMenu);
    }

    if (hasMore) {

      if (!Array.isArray(treeMenu.children)) {
        treeMenu.children = [];
      }

      TreeMenuUtil.insertMenu(dbMenu, paths, treeMenu.children);
    }
  }

  private static sorting(menuList?: TreeMenu[]): void {
    if (Array.isArray(menuList) && menuList.length > 0) {
      menuList.sort((m1, m2) => m1.ordering - m2.ordering);
      menuList.forEach(menu => {
        TreeMenuUtil.sorting(menu.children);
      })
    }
  }

  static buildTreeRootMenu(place: MenuPlace, menuList: TreeMenu[]): TreeRootMenu {

    TreeMenuUtil.sorting(menuList);

    return {
      place,
      children: menuList,
    };
  }
}
