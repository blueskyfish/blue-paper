import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundFilter } from './not-found.filter';
import { PaperIndexPageService } from './paper-index-page.service';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';

const paperServices: any[] = [
  PaperService,
  PaperIndexPageService,
];

/**
 * Paper module
 */
@Module({
  controllers: [
    PaperController,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
    ...paperServices,
  ],
})
export class PaperModule {
}
