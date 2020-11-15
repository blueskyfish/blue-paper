import { TreeMenu, TreeRootMenu } from '@blue-paper/server-editor-service';
import { IRepositoryPool, MenuPlace, RepositoryService } from '@blue-paper/server-repository';
import { Injectable } from '@nestjs/common';
import { TreeMenuUtil } from './tree-menu.util';

@Injectable()
export class MenuService {

  constructor(private repository: RepositoryService) {
  }

  /**
   * Get the menu list for the editor bureau
   *
   * @returns {Promise<TreeRootMenu[]>}
   */
  async getEditorTreeMenuList(): Promise<TreeRootMenu[]> {
    return await this.repository.execute(async (rep: IRepositoryPool) => {

      const dbList = await rep.menu.getEditorMenuList();

      const menuMap: Map<MenuPlace, TreeMenu[]> = new Map<MenuPlace, TreeMenu[]>([
        [ MenuPlace.Navbar, [] ],
        [ MenuPlace.Footer, [] ],
        [ MenuPlace.Hidden, [] ]
      ]);

      if (Array.isArray(dbList)) {
        dbList.forEach((dbMenu) => {
          TreeMenuUtil.append(menuMap, dbMenu);
        });
      }

      return [
        TreeMenuUtil.buildTreeRootMenu(MenuPlace.Navbar, menuMap.get(MenuPlace.Navbar)),
        TreeMenuUtil.buildTreeRootMenu(MenuPlace.Footer, menuMap.get(MenuPlace.Footer)),
        TreeMenuUtil.buildTreeRootMenu(MenuPlace.Hidden, menuMap.get(MenuPlace.Hidden))
      ];
    });
  }
}
