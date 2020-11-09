import { IsString } from 'class-validator';

/**
 * The path parameters for the html paper
 */
export class PaperParams {

  @IsString()
  pageUrl: string;
}
