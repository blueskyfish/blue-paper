import { Injectable } from '@nestjs/common';
import { ImageFileConfig } from '../image-commons.config';

@Injectable()
export class ImageSettingService {

  constructor(private config: ImageFileConfig) {
  }

  get imagePath(): string {
    return this.config.imagePath;
  }

  get imageCache(): string {
    return this.config.imageCache;
  }

  get imageTemp(): string {
    return this.config.imageTemp;
  }
}
