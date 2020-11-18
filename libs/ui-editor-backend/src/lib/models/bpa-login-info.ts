/* tslint:disable */
import { BpaUserInfo } from './bpa-user-info';
export interface BpaLoginInfo {

  /**
   * The authorization token
   */
  token: string;
  user: BpaUserInfo & any;
}
