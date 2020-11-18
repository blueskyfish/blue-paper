import { MenuPlace } from '@blue-paper/server-repository';
import { ApiProperty } from '@nestjs/swagger';

export class TreeMenu {

  @ApiProperty({
    description: 'The menuId or if the path node **0**',
    required: false,
  })
  menuId?: number;

  @ApiProperty({
    description: 'The title of the tree menu'
  })
  title: string;

  @ApiProperty({
    description: 'The path segment'
  })
  path: string;

  @ApiProperty({
    description: 'The order in the menu list'
  })
  ordering: number;

  @ApiProperty({
    description: 'The optional children menu list',
    required: false,
    isArray: true,
    type: TreeMenu,
  })
  children?: TreeMenu[];
}

export class TreeRootMenu {
  @ApiProperty({
    description: 'The place of the menu list',
    enum: MenuPlace,
    enumName: 'MenuPlace'
  })
  place: MenuPlace;

  @ApiProperty({
    description: 'The list of the main menu items',
    isArray: true,
    type: TreeMenu,
  })
  children: TreeMenu[];
}
