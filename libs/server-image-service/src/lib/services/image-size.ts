
export interface IImageSize {
  width?: number;
  height?: number;
}

/**
 * The map object with the size names and there image sizes.
 */
export type ImageSizes = {[sizeName: string]: IImageSize };
