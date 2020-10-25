import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { ServerImageServiceModule } from '@blue-paper/server-image-service';
import { ServerImageUploadModule } from '@blue-paper/server-image-upload';
import { ServerPaperServiceModule } from '@blue-paper/server-paper-service';
import { ServerRepositoryModule } from '@blue-paper/server-repository';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { environment } from '../environments/environment.prod';
import { buildDatabaseConfig, buildImageConfig, buildImageUploadConfig, buildStaticConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot(...buildStaticConfig()),

    ServerCommonsModule.forRoot(environment),
    ServerDatabaseModule.forRoot(buildDatabaseConfig()),
    ServerImageServiceModule.forRoot(buildImageConfig()),
    ServerImageUploadModule.forRoot(buildImageUploadConfig()),
    ServerRepositoryModule,
    ServerPaperServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
