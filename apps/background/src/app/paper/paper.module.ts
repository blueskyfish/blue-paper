import { Module } from '@nestjs/common';
import { PaperPageService } from './paper-page.service';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';

const paperServices: any[] = [
  PaperService,
  PaperPageService,
];

/**
 * Paper module
 */
@Module({
  controllers: [
    PaperController,
  ],
  providers: [
    ...paperServices,
  ],
})
export class PaperModule {
}
