import { API_KEY_NAME, HTTP_AUTH_HEADER } from '@blue-paper/server-authentication';
import { fromEnv } from '@blue-paper/server-commons';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BOOTSTRAP_GROUP } from './app/app.config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = fromEnv('bureau_port', '4444').asNumber;
  const host = fromEnv('bureau_host', 'localhost').asString;
  const globalPrefix = fromEnv('bureau_global_prefix', 'api').asString;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  // TODO disable the swagger module on "prod"
  // Setup OpenApi (Swagger)
  const options = new DocumentBuilder()
    .setTitle('Blue-Paper "Editor"')
    .setDescription('The Blue Paper Editor backend API')
    .setVersion('1.0')
    .addSecurity(API_KEY_NAME, {
      name: HTTP_AUTH_HEADER,
      in: 'header',
      type: 'apiKey',
      description: 'The api key for access for protected resource (contains the current user information)'
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('openapi-ui', app, document);
  app.use('/open-api.json', (req, res) => res.send(document));

  // listen for income request
  await app.listen(port, host, () => {
    Logger.log(`Listening at http://${host}:${port}/`, BOOTSTRAP_GROUP);
  });
}

bootstrap()
  .catch(e => Logger.error(`Startup Error => ${e.message}`, null, BOOTSTRAP_GROUP));
