import { Injectable } from '@nestjs/common';
import { PageInfo } from './entities';
import { PageContext } from './page-context';

/**
 * Manages the page request from the template **index**.
 */
@Injectable()
export class PaperIndexPageService {

  /**
   * Process the page request from the template **index**
   *
   * @param {PageContext} ctx the page context of the request
   * @param {PageInfo} page the page information from database
   * @returns {Promise<void>}
   */
  async process(ctx: PageContext, page: PageInfo): Promise<void> {
    const data = {
      ...page,
      message: 'Hello from paper page',
      path: ctx.pageUrl,
      query: JSON.stringify(ctx.query),
    };

    ctx.render(data);
  }
}
