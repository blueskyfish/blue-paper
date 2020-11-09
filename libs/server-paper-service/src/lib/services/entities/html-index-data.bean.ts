import { ApiProperty } from '@nestjs/swagger';
import { HtmlContent } from './html-content.bean';
import { HtmlData } from './html-data.bean';

/**
 * The data entity for the index pages
 *
 * @see {@link HtmlData}
 */
export class HtmlIndexData extends HtmlData {

  @ApiProperty({
    description: 'The content of the index page',
    type: HtmlContent
  })
  content: HtmlContent
}

