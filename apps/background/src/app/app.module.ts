import { Module } from '@nestjs/common';
import { ServerCommonsModule } from '@blue-paper/server-commons';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environment } from '../environments/environment.prod';

@Module({
  imports: [
    ServerCommonsModule.forRoot(environment)
  ],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
