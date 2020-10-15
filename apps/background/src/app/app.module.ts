import { Module } from '@nestjs/common';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { ServerDatabaseModule } from '@blue-paper/server-database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment.prod';

@Module({
  imports: [
    ServerDatabaseModule,
    ServerCommonsModule.forRoot(environment)
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
