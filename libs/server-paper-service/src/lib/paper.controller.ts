import { getFirstPathname, LogService, PathParams } from '@blue-paper/server-commons';
import { Controller, Get, Param, Query, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { PaperExceptionFilter } from './filters/paper-exception.filter';
import { toQuery } from './models/query-params';
import { QueryType } from './models/query-types';
import { PaperContext } from './services/paper.context';
import { PaperService } from './services/paper.service';

/**
 * The controller answer on request for html pages.
 *
 * e.g. `/index.html` or `urlaub/maui.html`
 */
@Controller()
@UseFilters(PaperExceptionFilter)
export class PaperController {

  constructor(
    private log: LogService,
    private paperService: PaperService
  ) {
  }

  /**
   * Handle the request for html pages.
   *
   * @param {string[]} pathname the path parameter (index `0`)
   * @param {QueryType} query the query maps
   * @param {e.Response} res the response instance
   * @returns {Promise<void>}
   */
  @Get('*.html')
  async renderHtml(@Param() pathname: PathParams, @Query() query: QueryType, @Res() res: Response): Promise<void> {

    const paperCtx = new PaperContext(getFirstPathname(pathname) || '/index', toQuery(query), res);

    await this.paperService.processHtmlPage(paperCtx);

    if (!paperCtx.sentData) {
      // no data sent to the response !!
      // TODO empty Page !!

      this.log.error('Paper', `Page not render => ${paperCtx.pageUrl} !!!!`);
    }
  }
}
