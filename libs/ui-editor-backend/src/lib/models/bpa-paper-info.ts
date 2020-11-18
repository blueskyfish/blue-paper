/* tslint:disable */
import { BpaMenuItem } from './bpa-menu-item';
export interface BpaPaperInfo {

  /**
   * The footer meu list.
   */
  footer: Array<BpaMenuItem>;

  /**
   * the id of the page or blog article
   */
  groupId: number;

  /**
   * the menu id
   */
  menuId: number;

  /**
   * The navbar menu list
   */
  navbar: Array<BpaMenuItem>;

  /**
   * The template name
   */
  template: string;

  /**
   * the title of the menu
   */
  title: string;
}
