import { fromEnv } from '@blue-paper/server-commons';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BOOTSTRAP_GROUP } from './app/app.config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = fromEnv('bureau_port', '4444').asNumber;
  const host = fromEnv('bureau_host', 'localhost').asString;
  const globalPrefix = fromEnv('bureau_global_prefix', 'api').asString;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  // listen for income request
  await app.listen(port, host, () => {
    Logger.log(`Listening at http://${host}:${port}/`, BOOTSTRAP_GROUP);
  });
}

bootstrap()
  .catch(e => Logger.error(`Startup Error => ${e.message}`, null, BOOTSTRAP_GROUP));
