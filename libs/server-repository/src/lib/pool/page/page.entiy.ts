/**
 * A repository entity of the table `files`
 */
export interface IDbPage {
  pageId: number;
  title: string;
  content: string;
  creation: Date;
  modified: Date;
}
