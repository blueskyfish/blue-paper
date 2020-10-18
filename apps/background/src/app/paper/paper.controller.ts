import { LogService } from '@blue-paper/server-commons';
import { Response } from 'express';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { basename, dirname } from 'path';
import { PAPER_GROUP, QueryParams } from './entities';
import { PageContext } from './page-context';
import { PaperService } from './paper.service';

@Controller()
export class PaperController {

  constructor(
    private log: LogService,
    private paper: PaperService
  ) {}

  /**
   * Handles the request from html endpoints
   *
   * @param path the params path
   * @param query the query parameters
   * @param res the response instance
   */
  @Get('*.html')
  async getPage(@Param() path: string[], @Query() query, @Res() res: Response) {
    this.log.debug(PAPER_GROUP, `Params   => "${JSON.stringify(path)}"`);
    this.log.debug(PAPER_GROUP, `Query    => ${JSON.stringify(query)}`)
    this.log.debug(PAPER_GROUP, `Template => ${basename(path[0])}`);
    this.log.debug(PAPER_GROUP, `pageUrl  => ${dirname(path[0])}`);

    const ctx = new PageContext(path[0], new QueryParams(query), res);
    await this.paper.process(ctx);
  }
}
