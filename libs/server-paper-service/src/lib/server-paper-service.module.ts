import { Global, Module } from '@nestjs/common';
import { PaperController } from './paper.controller';
import { HtmlIndexService } from './services/html-index.service';
import { PaperService } from './services/paper.service';

@Global()
@Module({
  controllers: [
    PaperController,
  ],
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
