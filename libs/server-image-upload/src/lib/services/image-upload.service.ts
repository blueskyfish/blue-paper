import { LogService } from '@blue-paper/server-commons';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageUploadService {

  constructor(
    private log: LogService
  ) {
  }
}
