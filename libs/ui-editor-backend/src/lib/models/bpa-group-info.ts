/* tslint:disable */
import { BpaUserName } from './bpa-user-name';
export interface BpaGroupInfo {
  author: BpaUserName & any;

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
