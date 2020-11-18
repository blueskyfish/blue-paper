import { LogService, timeStop } from '@blue-paper/server-commons';
import {
  PaperContext,
  PaperExceptionFilter,
  PaperService,
  QueryParams,
  QueryType,
  TemplateRenderFunc
} from '@blue-paper/server-paper-service';
import { Controller, Get, Param, Query, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { CONTROLLER_GROUP } from './app.config';
import { HtmlPaperParams } from './html-paper.params';

/**
 * Controller receives the html request and send the html paper as response.
 */
@Controller()
@UseFilters(PaperExceptionFilter)
export class HtmlPaperController {

  constructor(private log: LogService, private paperService: PaperService) {
  }

  @Get('/:pageUrl(*).html')
  async getHtmlPage(@Param() params: HtmlPaperParams, @Query() queryParams: QueryType, @Res() res: Response): Promise<void> {

    const responseRender: TemplateRenderFunc = (template, data) => res.render(template, data);

    const timer = timeStop();
    try {

      const paperContext = new PaperContext(params.pageUrl, QueryParams.toQuery(queryParams), responseRender);

      await this.paperService.processHtmlPage(paperContext);

      if(!paperContext.sentData) {
        //
        this.log.warn(CONTROLLER_GROUP, `Paper is not sent html from "${params.pageUrl}"`);
      }

    } finally {
      this.log.debug(CONTROLLER_GROUP, `Html request (${params.pageUrl} in ${timer.duration()} ms`);
    }
  }
}
