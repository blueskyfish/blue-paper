/**
 * The repository entity of the table `files`.
 */
export interface IDbFile {
  fileId: number;
  menuId: number;
  groupId: number;
  filename: string;
  mimetype: string;
  etag: string;
  size: number;
}
