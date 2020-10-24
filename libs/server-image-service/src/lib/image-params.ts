import { IsEnum, IsIn, IsNumberString, IsString, Length, MaxLength, MinLength, ValidateIf } from 'class-validator';

/**
 * The image parameters
 */
export class ImageParams {

  @IsNumberString()
  groupId: string;

  @IsIn(['fullwidth', 'gallery', 'preview'])
  size: string;

  @ValidateIf((f: string) => (
    f.endsWith('.jpg') || f.endsWith('.png'))
  )
  @Length(6, 250)
  filename: string;
}
