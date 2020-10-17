import { isNil, toLower } from '@blue-paper/shared-commons';
import { Response } from 'express';
import { basename, dirname } from 'path';
import { QueryParams } from './paper.models';

export class PageContext {

  constructor(public readonly path: string, public readonly queryParams: QueryParams, private res: Response) {}

  /**
   * Get the value or the array of values of the query parameters from given name
   * @param name the query name
   * @param defValue the default value if the query name is not exist
   */
  query(name: string, defValue: string): string | string[] {
    return this.queryParams[name] || defValue;
  }

  /**
   * Get the first value of the query parameters from the given name
   *
   * @param name the query name
   * @param defValue the default value if the query name is not exist
   */
  first(name: string, defValue: string): string {
    const params = this.query(name, defValue);
    return Array.isArray(params) ? (params[0] || defValue) : params;
  }

  get template(): string {
    return toLower(basename(this.path));
  }

  get pageUrl(): string {
    const d = dirname(this.path);
    if (isNil(d) || d === '' || d === '.') {
      return '/'
    }
    return toLower(d);
  }

  render(data: any, template: string = this.template) {
    this.res.render(template, data);
  }
}
