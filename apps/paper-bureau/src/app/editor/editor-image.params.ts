import { IsIn, IsNumberString, IsString } from 'class-validator';

/**
 * The parameters of the menu with the group
 */
export class EditorImageParams {

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

export class EditorImageDataParams {

  @IsString()
  imageData: string;

  @IsIn(['png', 'jpg'])
  fileExtension: string;
}
