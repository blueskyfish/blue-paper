import { ApiProperty } from '@nestjs/swagger';
import { UserName } from './user-name.bean';

/**
 * The group content to the menu
 */
export class GroupInfo {

  @ApiProperty({
    description: 'The group id'
  })
  groupId: number;

  @ApiProperty({
    description: 'The title of the group content'
  })
  title: string;

  @ApiProperty({
    description: 'The author of the content',
    type: UserName
  })
  author: UserName;

  @ApiProperty({
    description: 'The creation timestamp (YYYY-MM-DD HH:mm:ss)'
  })
  creation: string;

  @ApiProperty({
    description: 'The modified timestamp (YYYY-MM-DD HH:mm:ss)'
  })
  modified: string;
}
