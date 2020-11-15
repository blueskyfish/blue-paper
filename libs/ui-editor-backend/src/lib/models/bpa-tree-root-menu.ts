/* tslint:disable */
import { BpaTreeMenu } from './bpa-tree-menu';
import { BpaPlace } from './bpa-place';
export interface BpaTreeRootMenu {

  /**
   * The list of the main menu items
   */
  children: Array<BpaTreeMenu>;

  /**
   * The place of the menu list
   */
  place: BpaPlace;
}
