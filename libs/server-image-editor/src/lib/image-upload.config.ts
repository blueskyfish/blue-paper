
/**
 * Image upload configuration
 */
export interface IImageUploadConfig {

  /**
   * The temp directory for the uploading
   */
  imageTemp: string;

  /**
   * The list of accepted mimetypes
   */
  acceptedMimetypes: string[];
}
