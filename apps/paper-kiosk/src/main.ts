import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FileSystem, fromEnv } from '@blue-paper/server-commons';
import { configure } from 'nunjucks';
import { AppModule } from './app/app.module';
import { BOOTSTRAP_GROUP, THEME_PATH } from './app/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { isNil } from '@blue-paper/shared-commons';

async function bootstrap() {
  const port = fromEnv('background_port', '3333').asNumber;
  const host = fromEnv('background_host', 'localhost').asString;

  // theme path from environment...

  if (isNil(THEME_PATH) || THEME_PATH === '-' || !(await FileSystem.isDirectory(THEME_PATH))) {
    throw new Error('Env "BACKGROUND_THEME" is required');
  }

  // create the nestjs application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // template engine setup...
  const environment = configure(THEME_PATH, {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: true,
    noCache: fromEnv('NODE_ENV', 'local').asString === 'local',
    express: app,
  });
  app.engine('njk', environment.render);
  app.setViewEngine('njk');
  app.set('view cache', true);

  // listen for income request
  await app.listen(port, host, () => {
    Logger.log(`Listening at http://${host}:${port}/`, BOOTSTRAP_GROUP);
  });
}

bootstrap()
  .catch((e) => Logger.error(`Startup Error ${e.message}`, null, BOOTSTRAP_GROUP));
