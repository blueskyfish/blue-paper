import * as os from 'os';

/**
 * Image upload configuration
 */
export interface IImageUploadConfig {

  /**
   * The root path to the images
   */
  imagePath: string;

  /**
   * The temp directory for the uploading
   */
  imageTemp: string;

  /**
   * The list of accepted mimetypes
   */
  acceptedMimetypes: string[];
}

export class ImageUploadConfig implements IImageUploadConfig{

  get imagePath(): string {
    return this.config.imagePath || process.cwd();
  }

  get imageTemp(): string {
    return this.config.imageTemp || os.tmpdir();
  }

  get acceptedMimetypes(): string[] {
    return Array.isArray(this.config.acceptedMimetypes) ? this.config.acceptedMimetypes : [];
  }

  constructor(private config: IImageUploadConfig) {
  }
}
