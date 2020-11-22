/* tslint:disable */
import { BpaGroupInfo } from './bpa-group-info';
import { BpaTreeKind } from './bpa-tree-kind';
export interface BpaTreeMenu {

  /**
   * The optional children menu list
   */
  children?: Array<BpaTreeMenu>;
  group?: BpaGroupInfo & any;

  /**
   * The key path to this tree menu (e.g. `menuPlace://segement1/segement2/path`)
   */
  keyPath: string;

  /**
   * The kind of tree menu item
   */
  kind: BpaTreeKind;

  /**
   * The menuId or if the path node **-1**
   */
  menuId?: number;

  /**
   * The order in the menu list
   */
  ordering: number;

  /**
   * The path segment
   */
  path: string;

  /**
   * The title of the tree menu
   */
  title: string;
}
