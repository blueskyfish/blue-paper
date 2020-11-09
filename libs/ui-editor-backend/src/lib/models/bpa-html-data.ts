/* tslint:disable */
import { BpaBrand } from './bpa-brand';
import { BpaMenuItem } from './bpa-menu-item';
export interface BpaHtmlData {
  brand: BpaBrand & any;

  /**
   * The footer meu list.
   */
  footer: Array<BpaMenuItem>;

  /**
   * The navbar menu list
   */
  navbar: Array<BpaMenuItem>;

  /**
   * The title of the html data
   */
  title: string;
}
