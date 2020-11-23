import { Enabled, MenuPlace, Template } from '../../../models';

/**
 * Entity of menu repository
 */
export interface IDbMenu {

  /**
   * The id of the menu (PK)
   */
  menuId: number;

  /**
   * The page url (without the the file extension)
   */
  pageUrl: string;

  /**
   * The menu title
   */
  title: string;

  /**
   * The kind of template for the menu item
   */
  template: Template;

  /**
   * The ordering in the menu
   */
  ordering: number;

  /**
   * The id of the group content
   */
  groupId: number;

  /**
   * The place of the menu item
   */
  place: MenuPlace;

  /**
   * Json array of the necessary roles that the user is need (one of this)
   */
  roles: string;

  /**
   * Flag for enable or disable the menu item.
   */
  enabled: Enabled
}
