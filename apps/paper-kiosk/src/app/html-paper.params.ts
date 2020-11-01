import { IsString } from 'class-validator';

/**
 * The path parameters for the html paper
 */
export class HtmlPaperParams {

  @IsString()
  pageUrl: string;
}
