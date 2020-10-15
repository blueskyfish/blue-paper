import { Logger } from '@nestjs/common';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { fromEnv } from '@blue-paper/server-commons';
import { configure } from 'nunjucks';
import { AppModule } from './app/app.module';
import { APP_HOME, BOOTSTRAP_GROUP } from './app/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const port = fromEnv('background_port', '3333').asNumber;
  const host = fromEnv('background_host', 'localhost').asString;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const environment = configure(path.join(APP_HOME, 'data', 'theme'), {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: process.env.NODE_ENV === 'local' ? true : false,
    express: app,
  });

  app.engine('njk', environment.render);
  app.setViewEngine('njk');
  app.set('view cache', true);

  await app.listen(port, host, () => {
    Logger.log(`Listening at http://${host}:${port}/`, BOOTSTRAP_GROUP);
  });
}

bootstrap().catch((e) => Logger.error(e, null, BOOTSTRAP_GROUP));
