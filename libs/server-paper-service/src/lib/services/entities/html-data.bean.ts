import { Brand } from './brand.bean';
import { MenuItem } from './menu-item.bean';
import { ApiProperty } from '@nestjs/swagger';

/**
 * The base html data entity.
 */
export class HtmlData {

  @ApiProperty({ description: 'The title of the html data'})
  title: string;

  @ApiProperty({
    description: 'Brand information',
    type: Brand,
  })
  brand: Brand;

  @ApiProperty({
    description: 'The navbar menu list',
    type: MenuItem,
    isArray: true,
  })
  navbar: MenuItem[];

  @ApiProperty({
    description: 'The footer meu list.',
    type: MenuItem,
    isArray: true,
  })
  footer: MenuItem[];
}
