import { LogService } from '@blue-paper/server-commons';
import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE, PageInfo, PAPER_GROUP } from './entities';
import { PageContext } from './page-context';
import { NotFoundError } from './not-found.error';
import { PaperIndexPageService } from './paper-index-page.service';

@Injectable()
export class PaperService {

  private _themePath: string = null;

  constructor(
    private log: LogService,
    private page: PaperIndexPageService
  ) { }

  /**
   * Processes the page request
   * @param {PageContext} ctx the page context
   * @returns {Promise<void>}
   */
  async process(ctx: PageContext): Promise<void> {

    // TODO check if the page url exist
    const page = await this.getPageInfo(ctx);

    // process the templates
    switch (ctx.template) {
      case 'index':
        await this.page.process(ctx, page);
        break;
      default:
        throw new NotFoundError(`Template "${ctx.template}" is not found`, page);
        break;
    }
  }

  private async getPageInfo(ctx: PageContext): Promise<PageInfo> {
    try {
      const pageUrl = ctx.pageUrl;
      this.log.info(PAPER_GROUP, `Paper from "${pageUrl}"`);
      return {
        ...DEFAULT_PAGE,
      };
    } catch (e) {
      throw new NotFoundError(e.message, { ...DEFAULT_PAGE }); // TODO What is the page info
    }
  }
}
