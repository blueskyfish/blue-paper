import { Global, Module } from '@nestjs/common';
import { ImageDeliveryService } from './services/image-delivery.service';

const imageServices: any[] = [
  ImageDeliveryService,
];

/**
 * Image module
 */
@Global()
@Module({
  controllers: [],
  providers: [
    ...imageServices,
  ],
  exports: [
    ...imageServices,
  ]
})
export class ServerImageDeliveryModule {
}
