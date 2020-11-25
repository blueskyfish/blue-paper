/* tslint:disable */
import { BpaEnabled } from './bpa-enabled';
import { BpaGroupInfo } from './bpa-group-info';
import { BpaMenuPlace } from './bpa-menu-place';
import { BpaTemplate } from './bpa-template';
export interface BpaEditorMenuItem {

  /**
   * The menu item is enabled or disabled
   */
  enabled: BpaEnabled;
  group?: BpaGroupInfo & any;

  /**
   * The id of the menu item
   */
  menuId?: number;

  /**
   * The order in the menu list
   */
  ordering: number;

  /**
   * The page url for the menu item
   */
  pageUrl: string;

  /**
   * The place of the menu list
   */
  place: BpaMenuPlace;

  /**
   * The roles for the menu item
   */
  roles: Array<string>;

  /**
   * The kind of menu item
   */
  template: BpaTemplate;

  /**
   * The title of the menu item
   */
  title: string;
}
