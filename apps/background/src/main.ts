/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { fromEnv } from '@blue-paper/server-commons';

import { AppModule } from './app/app.module';

async function bootstrap() {

  const port = fromEnv('background_port', '3333').asNumber;

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().catch((e) => Logger.error(e, null, 'Bootstrap'));
