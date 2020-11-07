import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

/**
 * The parameters of the menu with the group
 */
export class EditorImageParams {

  /**
   * The menu id
   * @type {string}
   */
  @IsNumberString()
  @ApiProperty({
    description: 'The menu id'
  })
  menuId: string;

  /**
   * The id of page or blog article
   * @type {string}
   */
  @IsNumberString()
  @ApiProperty({description: 'The group id of the page or blog article'})
  groupId: string;
}
