import { Global, Module } from '@nestjs/common';
import { HtmlIndexService, PaperService } from './services';

const paperServices = [
  PaperService,
  HtmlIndexService,
]

@Global()
@Module({
  controllers: [
  ],
  providers: [
    ...paperServices,
  ],
  exports: [
    ...paperServices,
  ],
})
export class ServerPaperServiceModule {
}
