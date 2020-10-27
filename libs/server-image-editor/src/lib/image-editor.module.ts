import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { IImageUploadConfig } from './image-upload.config';
import { ImageUploadController } from './image-upload.controller';
import { ImageUploadService } from './services/image-upload.service';
import { buildConfiguration } from './image-upload.configuration';

const imageUploadServices: any[] = [
  ImageUploadService,
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
      controllers: [
        ImageUploadController,
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
