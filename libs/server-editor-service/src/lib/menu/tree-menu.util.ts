import { TreeMenu, TreeRootMenu } from '@blue-paper/server-editor-service';
import { IDbMenu, IDbMenuGroup, MenuPlace, Template } from '@blue-paper/server-repository';
import { isEmpty, isNil } from '@blue-paper/shared-commons';
import { TreeKind } from '../entities/tree-kind.enum';

export class TreeMenuUtil {

  static append(menuMap: Map<MenuPlace, TreeMenu[]>, dbMenu: IDbMenuGroup): void {

    const segments = dbMenu.pageUrl
      .split('/')
      .filter(s => !isNil(s) && !isEmpty(s));

    if (segments.length === 0) {
      return;
    }
    // Logger.debug(`Url segments ["${segments.join('", "')}"]`, 'Menu');

    const menuList = menuMap.get(dbMenu.place);

    const keyPath = `${dbMenu.place}:/`;

    TreeMenuUtil.insertMenu(keyPath, dbMenu, segments, menuList);
  }

  private static insertMenu(parentKeyPath: string, dbMenu: IDbMenuGroup, segments: string[], menuList: TreeMenu[]): void {
    const [first, ...paths] = segments;

    const hasMore = !isEmpty(paths);

    let treeMenu = menuList.find(menu => menu.path === first);
    const keyPath = `${parentKeyPath}/${first}`;

    if (isNil(treeMenu)) {
      treeMenu = {
        menuId: hasMore ? -1 : dbMenu.menuId,
        title: hasMore ? first : dbMenu.title,
        kind: hasMore ? TreeKind.Folder : TreeMenuUtil.fromMenuKind(dbMenu),
        path: first,
        ordering: dbMenu.ordering,
        children: hasMore ? [] : null,
        group: hasMore ? null : {
          groupId: dbMenu.groupId,
          title: dbMenu.title,
          author: {
            id: dbMenu.authorId,
            name: dbMenu.authorName
          },
          creation: dbMenu.creation.toISOString(),
          modified: dbMenu.modified.toISOString()
        },
        keyPath,
        pageUrl: dbMenu.pageUrl,
      };
      menuList.push(treeMenu);
    }

    if (hasMore) {

      if (!Array.isArray(treeMenu.children)) {
        treeMenu.children = [];
      }

      TreeMenuUtil.insertMenu(keyPath, dbMenu, paths, treeMenu.children);
    }
  }

  private static sorting(menuList?: TreeMenu[]): void {
    if (!isEmpty(menuList)) {
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

  static fromMenuKind(dbMenu: IDbMenu): TreeKind {
    switch (dbMenu.template) {
      case Template.Index:
        return TreeKind.Page;
      case Template.Blog:
        return TreeKind.Blog;
      default:
        return TreeKind.Folder;
    }
  }
}
