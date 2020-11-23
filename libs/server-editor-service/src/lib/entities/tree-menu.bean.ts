import { MenuPlace } from '@blue-paper/server-repository';
import { ApiProperty } from '@nestjs/swagger';
import { GroupInfo } from './group-info.bean';
import { TreeKind } from './tree-kind.enum';

/**
 * The menu item in the tree nodes
 */
export class TreeMenu {

  @ApiProperty({
    description: 'The menuId or if the path node **-1**',
    required: false,
  })
  menuId?: number;

  @ApiProperty({
    description: 'The title of the tree menu'
  })
  title: string;

  @ApiProperty({
    description: 'The kind of tree menu item',
    enum: TreeKind,
    enumName: 'TreeKind'
  })
  kind: TreeKind;

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


  @ApiProperty({
    description: 'The group content information (If kind = `folder` the group attribute is null)',
    type: GroupInfo,
    required: false
  })
  group?: GroupInfo;

  @ApiProperty({
    description: 'The key path to this tree menu (e.g. `menuPlace://segement1/segement2/path`)'
  })
  keyPath: string;

  @ApiProperty({
    description: 'The page url for the menu'
  })
  pageUrl: string;
}


/**
 * The tree root menu contains the place of the menus
 */
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
