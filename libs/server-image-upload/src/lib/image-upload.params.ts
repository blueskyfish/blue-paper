import { IsNumberString } from 'class-validator';

export class ImageUploadParams {

  @IsNumberString()
  menuId: string;

  @IsNumberString()
  groupId: string;
}
