
export interface IImageFileConfig {


  /**
   * The root path to the images
   */
  imagePath: string;

  /**
   * The root path to the image cache
   */
  imageCache: string;

  /**
   * The temp path for the image uploading
   */
  imageTemp: string;
}

export class ImageFileConfig implements IImageFileConfig{

  get imagePath(): string {
    return this.config.imagePath || process.cwd();
  }

  get imageCache(): string {
    return this.config.imageCache || process.cwd();
  }

  get imageTemp(): string {
    return this.config.imageTemp || process.cwd();
  }

  constructor(private config: IImageFileConfig) {
  }
}
