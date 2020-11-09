import { isNil } from '@blue-paper/shared-commons';
import { QueryParams, TemplateRenderFunc } from '../models';

/**
 * Paper context wraps the request information
 */
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
   * Paper context wraps the request information
   * @param {string} pageUrl the page url
   * @param {QueryParams} query the query parameters
   * @param {TemplateRenderFunc} [templateRender] the template render callback function
   */
  constructor(pageUrl: string, public query: QueryParams, private templateRender?: TemplateRenderFunc) {
    if (isNil(pageUrl)) {
      pageUrl = '/index';
    }
    if (!pageUrl.startsWith('/')) {
      pageUrl = `/${pageUrl}`;
    }
    this._pageUrl = pageUrl;

    // Only if an template render function is available, the render function can be called
    this._sentData = isNil(this.templateRender);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  send<T extends object>(template: string, data: T): void {

    if (this._sentData) {
      // data already sent...
      return;
    }
    // render the data
    this.templateRender(template, data);
    // set `true` of sent data !!
    this._sentData = true;
  }

  toString(): string {
    return `PaperContext (pageUrl=${this.pageUrl}, query=${this.query.toString()})`;
  }
}
