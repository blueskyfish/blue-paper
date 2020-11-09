/**
 * The menu item in a navbar or footer
 */
import { ApiProperty } from '@nestjs/swagger';

export class MenuItem {

  @ApiProperty({description: 'The title in the menu list'})
  title: string;

  @ApiProperty({description: 'The url to the page or blog html page'})
  pageUrl: string;

  @ApiProperty({description: 'The flag for active or deactivated of menu item'})
  active: boolean;
}
