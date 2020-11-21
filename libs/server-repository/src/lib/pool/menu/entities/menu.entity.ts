import { Enabled, MenuPlace } from '../../../models';
import { Template } from './template.enum';

/**
 * Entity of menu repository
 */
export interface IDbMenu {
  id: number;
  pageUrl: string;
  title: string;

  /**
   * The kind of template for the menu item
   */
  template: Template;
  ordering: number;
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
