import { LogService, toInt } from '@blue-paper/server-commons';
import { BuildImageUrl, ImageFileService } from '@blue-paper/server-image-commons';
import { IRepositoryPool, RepositoryService } from '@blue-paper/server-repository';
import { Injectable } from '@nestjs/common';
import { ImageUploadParams } from '../image-editor.params';

@Injectable()
export class ImageManagementService {

  constructor(
    private log: LogService,
    private repository: RepositoryService,
    private imageFile: ImageFileService
  ) {
  }

  async getImageListFromMenuGroup(params: ImageUploadParams): Promise<BuildImageUrl[]> {
    return this.repository.execute<BuildImageUrl[]>(async (rep: IRepositoryPool) => {

      const menuId = toInt(params.menuId);
      const groupId = toInt(params.groupId);

      return [];
    })
  }
}
