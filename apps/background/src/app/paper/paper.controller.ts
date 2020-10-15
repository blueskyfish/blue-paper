import { LogService } from '@blue-paper/server-commons';
import { Response } from 'express';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { basename } from 'path';

@Controller()
export class PaperController {

  constructor(private log: LogService) {}

  @Get('*.html')
  getIndex(@Param() path: string, @Res() res: Response, @Query() q) {
    this.log.info('Pager', `Template of "${JSON.stringify(path)}"`);
    this.log.info('Paper', `Query => ${JSON.stringify(q)}`)
    this.log.info('Paper', basename(path[0]));
    return res.render('index', {
      path: path[0],
      title: 'Hello',
      message: 'Say hello from Background.'
    });
  }
}
