import { DynamicModule, Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { IImageConfig, ImageConfig } from './server-image-service.config';
import { ImageService } from './services/image.service';

const imageServices: any[] = [
  ImageService,
];

/**
 * Image module
 */
@Module({})
export class ServerImageServiceModule {

  static forRoot(config: IImageConfig): DynamicModule {
    return {
      global: true,
      module: ServerImageServiceModule,
      controllers: [
        ImageController,
      ],
      providers: [
        {
          provide: ImageConfig,
          useValue: new ImageConfig(config),
        },
        ...imageServices,
      ],
      exports: [
        ...imageServices,
      ]
    }
  }
}
