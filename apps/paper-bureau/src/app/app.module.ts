import { AuthMiddleware, ServerAuthenticationModule } from '@blue-paper/server-authentication';
import { fromEnv, ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerEditorServiceModule } from '@blue-paper/server-editor-service';
import { ServerImageCommonsModule } from '@blue-paper/server-image-commons';
import { ServerImageDeliveryModule } from '@blue-paper/server-image-delivery';
import { ServerImageEditorModule } from '@blue-paper/server-image-editor';
import { ServerRepositoryModule } from '@blue-paper/server-repository';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { environment } from '../environments/environment';
import {
  BOOTSTRAP_GROUP,
  buildAuthenticationConfig,
  buildDatabaseConfig,
  buildImageFileConfig,
  configStoreDev
} from './app.config';

import { SystemController } from './system/system.controller';
import { EditorImageController } from './editor/editor-image.controller';
import { ImageDeliveryController } from './editor/image-delivery.controller';
import { buildUploadConfiguration } from './image/upload-configuration';
import { UserController } from './user.controller';

@Module({
  imports: [
    MulterModule.register(buildUploadConfiguration()),

    ServerCommonsModule.forRoot(environment),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerRepositoryModule,
    ServerAuthenticationModule.forRoot(buildAuthenticationConfig()),
    ServerImageCommonsModule.forRoot(buildImageFileConfig()),
    ServerImageEditorModule,
    ServerImageDeliveryModule,
    ServerEditorServiceModule.forRoot(null),
  ],
  controllers: [
    EditorImageController,
    ImageDeliveryController,
    UserController,
    SystemController
  ],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {

    const globalPrefix = fromEnv('bureau_global_prefix', 'api').asString;

    const publicPaths = [ '/images/*', ...['/', '/login'].map(url => `/${globalPrefix}${url}`)];
    Logger.log(`Public Endpoints ["${publicPaths.join('", "')}"]`, BOOTSTRAP_GROUP);

    consumer
      .apply(AuthMiddleware) // AuthMiddleware
      .exclude(...publicPaths)
      .forRoutes(
        UserController,
      )

  }
}
