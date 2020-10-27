import { Global, Module } from '@nestjs/common';
import { ImageDeliveryController } from './image-delivery.controller';
import { ImageDeliveryService } from './services/image-delivery.service';

const imageServices: any[] = [
  ImageDeliveryService,
];

/**
 * Image module
 */
@Global()
@Module({
  controllers: [
    ImageDeliveryController,
  ],
  providers: [
    ...imageServices,
  ],
  exports: [
    ...imageServices,
  ]
})
export class ServerImageServiceModule {
}
