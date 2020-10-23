import { Global, Module } from '@nestjs/common';
import { HtmlIndexService } from './services/html-index.service';
import { PaperService } from './services/paper.service';

@Global()
@Module({
  providers: [
    PaperService,
    HtmlIndexService,
  ],
  exports: [
    PaperService,
    HtmlIndexService,
  ],
})
export class ServerPaperServiceModule {
}
