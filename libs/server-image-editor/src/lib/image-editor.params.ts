import { IsNumberString } from 'class-validator';

/**
 * The parameters of the image uploading
 */
export class ImageUploadParams {

  /**
   * The menu id
   * @type {string}
   */
  @IsNumberString()
  menuId: string;

  /**
   * The id of page or blog article
   * @type {string}
   */
  @IsNumberString()
  groupId: string;
}
