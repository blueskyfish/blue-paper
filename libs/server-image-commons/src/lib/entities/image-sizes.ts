/**
 * The image size. One of the attributes is required or both are in use
 */
export interface IImageSize {

  /**
   * The width of the image
   */
  width?: number;

  /**
   * The height of the image
   */
  height?: number;
}

/**
 * The map object with the size names and there image sizes.
 */
export type ImageSizes = {[sizeName: string]: IImageSize };
