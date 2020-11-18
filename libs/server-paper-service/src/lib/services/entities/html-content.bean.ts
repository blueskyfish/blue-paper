import { ApiProperty } from '@nestjs/swagger';

export class HtmlContent {

  @ApiProperty({description: 'The title of the page content'})
  title: string;

  @ApiProperty({description: 'The html body content'})
  body: string;
}
