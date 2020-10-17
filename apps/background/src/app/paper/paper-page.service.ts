import { Injectable } from '@nestjs/common';
import { PageContext } from './page-context';

@Injectable()
export class PaperPageService {

  async process(ctx: PageContext): Promise<void> {
    const data = {
      message: 'Hello from paper page',
      path: ctx.pageUrl,
      query: JSON.stringify(ctx.queryParams),
    };

    ctx.render(data);
  }
}
