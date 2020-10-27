/**
 * The image url entity for encrypted or decrypted image urls.
 */
export interface BuildImageUrl {
  fileId: number;
  menuId: number;
  groupId: number;
  size: string;
  filename: string;
  mimetype: string;
  etag: string;
}
