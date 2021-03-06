import { IsString } from 'class-validator';

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
}
