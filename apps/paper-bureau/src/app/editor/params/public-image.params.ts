import { IsIn, IsNumberString, IsString, ValidateIf } from 'class-validator';

/**
 * Path parameters for the public image request
 */
export class PublicImageParams {

  @IsNumberString()
  menuId: string;

  @IsNumberString()
  groupId: string;

  @IsIn(['preview', 'thumbnail'])
  sizeName: string;

  @IsString()
  @ValidateIf((f) => {
    return f.endsWith('jpg') || f.endsWith('png')
  })
  filename: string;
}
