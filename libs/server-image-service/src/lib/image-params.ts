import { IsEnum, IsIn, IsNumberString, IsString, Length, MaxLength, MinLength, ValidateIf } from 'class-validator';

/**
 * The image parameters
 */
export class PageImageParams {

  @IsNumberString()
  pageId: string;

  @IsIn(['fullwidth', 'gallery', 'preview'])
  size: string;

  @ValidateIf((f: string) => (
    f.endsWith('.jpg') || f.endsWith('.png'))
  )
  @Length(6, 250)
  filename: string;
}

export class BlogImageParams {

  @IsNumberString()
  themeId: string;

  @IsNumberString()
  blogId: string;

  @IsIn(['fullwidth', 'gallery', 'preview'])
  size: string;

  @ValidateIf((f: string) => (
    f.endsWith('.jpg') || f.endsWith('.png'))
  )
  @Length(6, 250)
  filename: string;

}
