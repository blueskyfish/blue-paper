import { ServerAuthenticationModule } from '@blue-paper/server-authentication';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerImageCommonsModule } from '@blue-paper/server-image-commons';
import { ServerImageDeliveryModule } from '@blue-paper/server-image-delivery';
import { ServerPaperServiceModule } from '@blue-paper/server-paper-service';
import { ServerRepositoryModule } from '@blue-paper/server-repository';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '../environments/environment.prod';
import {
  buildAuthenticationConfig,
  buildDatabaseConfig,
  buildImageFileConfig,
  buildStaticConfig
} from './app.config';
import { AppController } from './app.controller';
import { HtmlPaperController } from './html-paper.controller';
import { ImageDeliveryController } from './image-delivery.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot(...buildStaticConfig()),

    ServerCommonsModule.forRoot(environment),
    ServerAuthenticationModule.forRoot(buildAuthenticationConfig()),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerImageCommonsModule.forRoot(buildImageFileConfig()),
    ServerImageDeliveryModule,
    ServerRepositoryModule,
    ServerPaperServiceModule,
  ],
  controllers: [
    ImageDeliveryController,
    HtmlPaperController,
    AppController
  ],
  providers: [],
})
export class AppModule {
}
