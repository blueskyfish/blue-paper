import { MenuItem } from './menu-item';

/**
 * The paper information
 */
export interface PaperInfo {

  /**
   * menu id
   */
  readonly id: number;

  /**
   * The page or blog id
   */
  readonly groupId: number;

  /**
   * Title of the menu
   */
  readonly title: string;

  /**
   * The template for render engine
   */
  readonly template: string;

  readonly navbar: MenuItem[];

  readonly footer: MenuItem[];
}
