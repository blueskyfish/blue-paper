import { Enabled, GroupStatus, MenuPlace, Template } from '../../../models';

export interface IDbMenuGroup {

  menuId: number;

  pageUrl: string;

  title: string;

  /**
   * The kind of template for the menu item
   */
  template: Template;

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

  groupId: number;

  groupTitle: string;

  creation: Date;

  modified: Date;

  status: GroupStatus;

  authorId: number;

  authorName: string;
}
