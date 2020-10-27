import { IsIn, IsNumberString, IsString, Length, ValidateIf } from 'class-validator';

/**
 * The http header name `etag`
 */
export const HEADER_ETAG = 'ETag';

/**
 * The http header name `If-None-Match`
 */
export const HEADER_IF_NOT_MATCH = 'If-None-Match';

/**
 * The http header name `Content-Type`
 */
export const HEADER_CONTENT_TYPE = 'Content-Type';


export class ImageDataParams {

  @IsString()
  imageData: string;

  @IsIn(['png', 'jpg'])
  fileExtension: string;
}
