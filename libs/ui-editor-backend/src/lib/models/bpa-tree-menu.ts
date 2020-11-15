/* tslint:disable */
export interface BpaTreeMenu {

  /**
   * The optional children menu list
   */
  children?: Array<BpaTreeMenu>;

  /**
   * The menuId or if the path node **0**
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
