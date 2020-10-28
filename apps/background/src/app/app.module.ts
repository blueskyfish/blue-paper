import { ServerAuthenticationModule } from '@blue-paper/server-authentication';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerImageCommonsModule } from '@blue-paper/server-image-commons';
import { ServerImageDeliveryModule } from '@blue-paper/server-image-delivery';
import { ServerImageEditorModule } from '@blue-paper/server-image-editor';
import { ServerPaperServiceModule } from '@blue-paper/server-paper-service';
import { ServerRepositoryModule } from '@blue-paper/server-repository';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '../environments/environment.prod';
import {
  buildAuthenticationConfig,
  buildDatabaseConfig,
  buildImageFileConfig,
  buildImageUploadConfig,
  buildStaticConfig
} from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageDeliveryController } from './image/image-delivery.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot(...buildStaticConfig()),

    ServerCommonsModule.forRoot(environment),
    ServerAuthenticationModule.forRoot(buildAuthenticationConfig()),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerImageCommonsModule.forRoot(buildImageFileConfig()),
    ServerImageDeliveryModule,
    ServerImageEditorModule.forRoot(buildImageUploadConfig()),
    ServerRepositoryModule,
    ServerPaperServiceModule,
  ],
  controllers: [
    ImageDeliveryController,
    AppController
  ],
  providers: [AppService],
})
export class AppModule {
}
