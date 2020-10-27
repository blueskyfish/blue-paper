import { DynamicModule, Module } from '@nestjs/common';
import { IImageFileConfig, ImageFileConfig } from './image-commons.config';
import { ImageFileService, ImageProcessService, ImageSettingService } from './services';

const commonsServices = [
  ImageFileService,
  ImageProcessService,
  ImageSettingService,
];

@Module({})
export class ServerImageCommonsModule {

  static forRoot(config: IImageFileConfig): DynamicModule {
    return {
      global: true,
      module: ServerImageCommonsModule,
      providers: [
        {
          provide: ImageFileConfig,
          useValue: new ImageFileConfig(config),
        },
        ...commonsServices,
      ],
      exports: [
        ...commonsServices,
      ],
    };
  }
}
