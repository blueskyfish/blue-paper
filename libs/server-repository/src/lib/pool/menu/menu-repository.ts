import { SubRepository } from '../sub-repository';
import { IDbMenu } from './entities/menu.entity';
import { SQL_FIND_MENU_BY_PAGE_URL, SQL_SELECT_EDITOR_MENU_LIST, SQL_SELECT_MENU_LIST } from './menu-repository.sql';

/**
 * Repository for the menu table
 */
export class MenuRepository extends SubRepository {

  /**
   * Get the menu entity from the given page url
   * @param {string} pageUrl the page url
   * @returns {Promise<IDbMenu | null>}
   */
  async findMenuByPageUrl(pageUrl: string): Promise<IDbMenu | null > {
    return await this.conn.selectOne<IDbMenu>(SQL_FIND_MENU_BY_PAGE_URL, {pageUrl});
  }

  /**
   * Get the menu items
   *
   * @returns {Promise<IDbMenu[]>}
   */
  async getMenuList(): Promise<IDbMenu[]> {
    return await this.conn.select<IDbMenu>(SQL_SELECT_MENU_LIST);
  }

  /**
   * The menu list. It is requested from the editor.
   *
   * @returns {Promise<IDbMenu[]>}
   */
  async getEditorMenuList(): Promise<IDbMenu[]> {
    return await this.conn.select<IDbMenu>(SQL_SELECT_EDITOR_MENU_LIST);
  }
}
