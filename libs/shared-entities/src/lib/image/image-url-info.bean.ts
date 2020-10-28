/**
 * Information about the image file with the url to get the image
 */
export interface ImageUrlInfo {
  fileId: number;
  menuId: number;
  groupId: number;

  /**
   * The value is from type ImageSizeName and describes the size name (fullwidth, gallery, etc)
   */
  size: string;
  filename: string;
  mimetype: string;
  etag: string;
  imageUrl: string;
}
