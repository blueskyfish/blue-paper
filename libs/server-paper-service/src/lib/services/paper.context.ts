import { isNil } from '@blue-paper/shared-commons';
import { QueryParams } from '../models/query-params';
import { RenderFunc } from '../models/render-func';


export class PaperContext {

  private readonly _pageUrl: string;
  private _sentData = false;

  get pageUrl(): string {
    return this._pageUrl;
  }

  /**
   * Returns `true`if send on the context is call the send method.
   *
   * @returns {boolean}
   */
  get sentData(): boolean {
    return this._sentData;
  }

  /**
   *
   * @param {string} pageUrl
   * @param {QueryParams} query
   * @param {RenderFunc} res
   */
  constructor(pageUrl: string, public query: QueryParams, private res: RenderFunc) {
    if (isNil(pageUrl)) {
      pageUrl = '/index';
    }
    if (!pageUrl.startsWith('/')) {
      pageUrl = `/${pageUrl}`;
    }
    this._pageUrl = pageUrl;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  send<T extends object>(template: string, data: T): void {

    if (this._sentData) {
      // data already sent...
      return;
    }
    // render the data
    this.res.render(template, data);
    // set `true` of sent data !!
    this._sentData = true;
  }

  toString(): string {
    return `PaperContext (pageUrl=${this.pageUrl}, query=${this.query.toString()})`;
  }
}
