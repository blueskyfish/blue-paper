import { ApiProperty } from '@nestjs/swagger';

/**
 * Information about the image file with the url to get the image
 */
export class ImageUrlInfo {

  @ApiProperty({description: 'The file id'})
  fileId: number;
  @ApiProperty({description: 'The menu id'})
  menuId: number;
  @ApiProperty({description: 'The group id of the page or blog article'})
  groupId: number;
  @ApiProperty({description: 'The value is from type ImageSizeName and describes the size name (fullwidth, gallery, etc)'})
  size: string;
  @ApiProperty({description: 'The filename'})
  filename: string;
  @ApiProperty({description: 'The mimetype of the image'})
  mimetype: string;
  @ApiProperty({description: 'The etag with the image size'})
  etag: string;
  @ApiProperty({description: 'The encrypted image url'})
  imageUrl: string;
}
