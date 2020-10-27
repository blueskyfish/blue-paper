import { ServerAuthenticationModule } from '@blue-paper/server-authentication';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerImageCommonsModule } from '@blue-paper/server-image-commons';
import { ServerImageServiceModule } from '@blue-paper/server-image-service';
import { ServerImageUploadModule } from '@blue-paper/server-image-upload';
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

@Module({
  imports: [
    ServeStaticModule.forRoot(...buildStaticConfig()),

    ServerCommonsModule.forRoot(environment),
    ServerAuthenticationModule.forRoot(buildAuthenticationConfig()),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerImageCommonsModule.forRoot(buildImageFileConfig()),
    ServerImageServiceModule,
    ServerImageUploadModule.forRoot(buildImageUploadConfig()),
    ServerRepositoryModule,
    ServerPaperServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
