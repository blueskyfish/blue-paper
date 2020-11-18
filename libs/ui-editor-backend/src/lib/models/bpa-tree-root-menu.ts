/* tslint:disable */
import { BpaMenuPlace } from './bpa-menu-place';
import { BpaTreeMenu } from './bpa-tree-menu';
export interface BpaTreeRootMenu {

  /**
   * The list of the main menu items
   */
  children: Array<BpaTreeMenu>;

  /**
   * The place of the menu list
   */
  place: BpaMenuPlace;
}
