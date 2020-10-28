import { IsIn, IsString } from 'class-validator';

/**
 * Parameters from the image request
 *
 * ```
 * @Get('/:imageData.:fileExtension(jpg|png)')
 * ```
 */
export class ImageDataParams {

  @IsString()
  imageData: string;

  @IsIn(['png', 'jpg'])
  fileExtension: string;
}
