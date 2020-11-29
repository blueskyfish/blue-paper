import { Enabled, GroupStatus, MenuPlace, Template } from '../../../models';

export interface IDbMenuGroup {

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

  /**
   * The id of the group content
   */
  groupId: number;

  /**
   * The title of the group content
   */
  groupTitle: string;

  /**
   * The datetime of creation
   */
  creation: Date;

  /**
   * The datetime of modified
   */
  modified: Date;

  /**
   * The status if the group content
   */
  status: GroupStatus;

  /**
   * The id of the author
   */
  authorId: number;

  /**
   * The name of the author
   */
  authorName: string;
}
