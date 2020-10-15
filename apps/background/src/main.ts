import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { fromEnv } from '@blue-paper/server-commons';

import { AppModule } from './app/app.module';
import { BOOTSTRAP_GROUP } from './app/app.config';

async function bootstrap() {
  const port = fromEnv('background_port', '3333').asNumber;
  const host = fromEnv('background_host', 'localhost').asString;

  const app = await NestFactory.create(AppModule);

  await app.listen(port, host, () => {
    Logger.log(`Listening at http://${host}:${port}/`, BOOTSTRAP_GROUP);
  });
}

bootstrap().catch((e) => Logger.error(e, null, BOOTSTRAP_GROUP));
