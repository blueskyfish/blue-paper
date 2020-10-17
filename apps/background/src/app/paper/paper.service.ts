import { EnvService, LogService } from '@blue-paper/server-commons';
import { isNil } from '@blue-paper/shared-commons';
import { Injectable } from '@nestjs/common';
import { PageContext } from './page-context';
import { PaperPageService } from './paper-page.service';
import { PAPER_GROUP } from './paper.models';

@Injectable()
export class PaperService {

  private _themePath: string = null;

  constructor(
    private log: LogService,
    private envService: EnvService,
    private page: PaperPageService
  ) { }


  async process(ctx: PageContext): Promise<void> {

    // check if the page url exist
    const pageUrl = ctx.pageUrl;
    this.log.info(PAPER_GROUP, `Paper from "${pageUrl}"`);

    // process the templates
    switch (ctx.template) {
      case 'index':
        await this.page.process(ctx);
        break;
      default:
        await this.notFoundPage(ctx);
        break;
    }
  }

  private async notFoundPage(ctx: PageContext): Promise<void> {

    const data = {
      message: 'Page not found',
      pageUrl: ctx.pageUrl,
      template: ctx.template,
      query: JSON.stringify(ctx.queryParams),
    };
    ctx.render(data, 'not-found');
  }


  private get themePath(): string {
    if (isNil(this._themePath)) {
      this._themePath = this.envService.getEnv('BACKGROUND_THEME', null).asString;
      if (!isNil(this._themePath)) {
        this.log.error(PAPER_GROUP, 'The env "BACKGROUND_THEME" is required');
      }
    }
    return this._themePath;
  }

}
