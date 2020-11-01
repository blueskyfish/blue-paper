import { Global, Module } from '@nestjs/common';
import { HtmlIndexService } from './services/html-index.service';
import { PaperService } from './services/paper.service';

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
