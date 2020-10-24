/**
 * Configuration of image service
 */
export interface IImageConfig {

  /**
   * The root path to the images
   */
  imagePath: string;

  /**
   * The root path to the image cache
   */
  imageCache: string;
}

/**
 * @see {@link IImageConfig}
 */
export class ImageConfig implements IImageConfig {

  get imagePath(): string {
    return this.config.imagePath || process.cwd();
  }

  get imageCache(): string {
    return this.config.imageCache || process.cwd();
  }

  constructor(private readonly config: IImageConfig) {
  }

  toString(): string {
    return `ImageConfig (imagePath=${this.imagePath})`;
  }
}
