import { BpaTemplate, BpaUserName } from '@blue-paper/ui-editor-backend';

export interface TextContent {

  menuId: number;

  template: BpaTemplate;

  author: BpaUserName;

  /**
   * The creation timestamp (YYYY-MM-DD HH:mm:ss)
   */
  creation: string;

  /**
   * The group id
   */
  groupId: number;

  /**
   * The modified timestamp (YYYY-MM-DD HH:mm:ss)
   */
  modified: string;

  /**
   * The title of the group content
   */
  title: string;
}
