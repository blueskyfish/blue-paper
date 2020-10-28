import { ServerAuthenticationModule } from '@blue-paper/server-authentication';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerImageCommonsModule } from '@blue-paper/server-image-commons';
import { ServerImageDeliveryModule } from '@blue-paper/server-image-delivery';
import { ServerImageEditorModule } from '@blue-paper/server-image-editor';
import { ServerRepositoryModule } from '@blue-paper/server-repository';
import { Module } from '@nestjs/common';
import { environment } from '../environments/environment';
import {
  buildAuthenticationConfig,
  buildDatabaseConfig,
  buildImageEditorConfig,
  buildImageFileConfig
} from './app.config';

import { AppController } from './app.controller';
import { EditorImageController } from './editor/editor-image.controller';

@Module({
  imports: [
    ServerCommonsModule.forRoot(environment),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerRepositoryModule,
    ServerAuthenticationModule.forRoot(buildAuthenticationConfig()),
    ServerImageCommonsModule.forRoot(buildImageFileConfig()),
    ServerImageDeliveryModule,
    ServerImageEditorModule.forRoot(buildImageEditorConfig())
  ],
  controllers: [
    EditorImageController,
    AppController
  ],
  providers: [],
})
export class AppModule {}
