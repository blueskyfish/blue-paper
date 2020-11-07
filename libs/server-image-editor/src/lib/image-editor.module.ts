import { Global, Module } from '@nestjs/common';
import { ImageManagerService } from './services/image-manager.service';

const imageUploadServices: any[] = [
  ImageManagerService,
];

@Global()
@Module({
  providers: [
    ...imageUploadServices,
  ],
  exports: [
    ...imageUploadServices,
  ]
})
export class ServerImageEditorModule {
}
