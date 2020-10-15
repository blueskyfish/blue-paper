import { PaperController } from './paper/paper.controller';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment.prod';
import { buildStaticConfig } from './app.config';

@Module({
  imports: [
    ServerCommonsModule.forRoot(environment),
    ServerDatabaseModule,

    ServeStaticModule.forRoot(...buildStaticConfig()),
  ],
  controllers: [
    PaperController,
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
