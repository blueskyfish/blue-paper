import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from './menu-item.bean';

/**
 * The paper information
 */
export class PaperInfo {

  @ApiProperty({description: 'the menu id'})
  readonly menuId: number;

  @ApiProperty({description: 'the id of the page or blog article'})
  readonly groupId: number;

  @ApiProperty({description: 'the title of the menu'})
  readonly title: string;

  @ApiProperty({description: 'The template name'})
  readonly template: string;

  @ApiProperty({
    description: 'The navbar menu list',
    type: MenuItem,
    isArray: true,
  })
  readonly navbar: MenuItem[];

  @ApiProperty({
    description: 'The footer meu list.',
    type: MenuItem,
    isArray: true,
  })
  readonly footer: MenuItem[];
}
