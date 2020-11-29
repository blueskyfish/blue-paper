import { EditorMenuItem } from '@blue-paper/server-editor-service';
import { IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { JsonUtil } from '@blue-paper/shared-commons';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {

  constructor(private repository: RepositoryService) {
  }

  /**
   * Get the menu list for the editor bureau
   *
   * @returns {Promise<EditorMenuItem[]>}
   */
  async getEditorMenuList(): Promise<EditorMenuItem[]> {
    return await this.repository.execute(async (rep: IRepositoryPool) => {

      const dbList = await rep.menu.getEditorMenuList();

      if (Array.isArray(dbList)) {
        return dbList.map((db) => {
          return {
            menuId: db.menuId,
            place: db.place,
            title: db.title,
            template: db.template,
            pageUrl: db.pageUrl,
            ordering: db.ordering,
            group: {
              groupId: db.groupId,
              title: db.groupTitle,
              author: {
                id: db.authorId,
                name: db.authorName
              },
              creation: db.creation.toISOString(),
              modified: db.modified.toISOString()
            },
            enabled: db.enabled,
            roles: JsonUtil.parse<string[]>(db.roles, []),
          } as EditorMenuItem;
        });
      }

      return [];
    });
  }
}
