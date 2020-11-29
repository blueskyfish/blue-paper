import { Enabled, MenuPlace, Template } from '@blue-paper/server-repository';
import { ApiProperty } from '@nestjs/swagger';
import { GroupInfo } from './group-info.bean';

/**
 * The bean is the menu item in the list
 */
export class EditorMenuItem {

  @ApiProperty({
    description: 'The id of the menu item',
    required: false,
  })
  menuId?: number;

  @ApiProperty({
    description: 'The place of the menu list',
    enum: MenuPlace,
    enumName: 'MenuPlace'
  })
  place: MenuPlace;

  @ApiProperty({
    description: 'The title of the menu item'
  })
  title: string;

  @ApiProperty({
    description: 'The kind of menu item',
    enum: Template,
    enumName: 'Template'
  })
  template: Template

  @ApiProperty({
    description: 'The page url for the menu item'
  })
  pageUrl: string;

  @ApiProperty({
    description: 'The order in the menu list'
  })
  ordering: number;

  @ApiProperty({
    description: 'The group content information',
    type: GroupInfo,
    required: false
  })
  group: GroupInfo;

  @ApiProperty({
    description: 'The menu item is enabled or disabled',
    enumName: 'Enabled',
    enum: Enabled
  })
  enabled: Enabled;

  @ApiProperty({
    description: 'The roles for the menu item',
    isArray: true,
    type: String
  })
  roles: string[];
}

