import { ServerAuthenticationModule } from '@blue-paper/server-authentication';
import { fromEnv, ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerEditorServiceModule } from '@blue-paper/server-editor-service';
import { ServerImageCommonsModule } from '@blue-paper/server-image-commons';
import { ServerImageDeliveryModule } from '@blue-paper/server-image-delivery';
import { ServerImageEditorModule } from '@blue-paper/server-image-editor';
import { ServerRepositoryModule } from '@blue-paper/server-repository';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { environment } from '../environments/environment';
import {
  buildAuthenticationConfig,
  buildDatabaseConfig,
  buildImageEditorConfig,
  buildImageFileConfig
} from './app.config';

import { AppController } from './app.controller';
import { EditorImageController } from './editor/editor-image.controller';
import { ImageDeliveryController } from './editor/image-delivery.controller';
import { UserController } from './user.controller';

@Module({
  imports: [
    ServerCommonsModule.forRoot(environment),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerRepositoryModule,
    ServerAuthenticationModule.forRoot(buildAuthenticationConfig()),
    ServerImageCommonsModule.forRoot(buildImageFileConfig()),
    ServerImageDeliveryModule,
    ServerEditorServiceModule.forRoot(null),
    ServerImageEditorModule.forRoot(buildImageEditorConfig())
  ],
  controllers: [
    EditorImageController,
    ImageDeliveryController,
    UserController,
    AppController
  ],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
/*
    const globalPrefix = fromEnv('bureau_global_prefix', 'api').asString;

    const publicPaths = [ '/images/*', ...['/', '/login'].map(url => `/${globalPrefix}${url}`)];

    consumer
      .apply() // AuthMiddleware
      .exclude(...publicPaths)
      .forRoutes()

 */
  }
}
