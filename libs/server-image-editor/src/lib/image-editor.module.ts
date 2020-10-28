import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { IImageUploadConfig } from './image-upload.config';
import { ImageManagerService } from './services/image-manager.service';
import { buildConfiguration } from './image-upload.configuration';

const imageUploadServices: any[] = [
  ImageManagerService,
];

@Module({})
export class ServerImageEditorModule {

  static forRoot(config: IImageUploadConfig): DynamicModule {
    return {
      global: true,
      module: ServerImageEditorModule,
      imports: [
        MulterModule.register(buildConfiguration(config.imageTemp, config.acceptedMimetypes)),
      ],
      providers: [
        ...imageUploadServices,
      ],
      exports: [
        ...imageUploadServices,
      ]
    };
  }
}
