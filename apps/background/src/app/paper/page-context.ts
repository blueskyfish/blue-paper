import { isNil, toLower } from '@blue-paper/shared-commons';
import { Response } from 'express';
import { basename, dirname } from 'path';
import { QueryParams } from './entities';

/**
 * extract the page url from the given path
 * @param {string} path the path
 * @returns {string} the page url
 */
function getPageUrl(path: string): string {
  const d = dirname(path);
  if (isNil(d) || d === '' || d === '.') {
    return '/'
  }
  return toLower(d);
}

/**
 * The page context from an given request.
 */
export class PageContext {

  /**
   * The template name. It is the last part of the property `path`
   * @type {string}
   */
  public readonly template: string;

  /**
   * The page url. it is the part of the property `path` without the last part.
   * @type {string}
   */
  public readonly pageUrl: string;

  /**
   * Create a page context
   * @param {string} path the path information from the request
   * @param {QueryParams} query the query parameters
   * @param {e.Response} res the response object from the request.
   */
  constructor(public readonly path: string, public readonly query: QueryParams, private res: Response) {
    this.template = toLower(basename(this.path));
    this.pageUrl =  getPageUrl(this.path);
  }

  /**
   * Render the output with the given template and the data object.
   *
   * @param data the data object
   * @param {string} [template] the template name.
   */
  render(data: any, template?: string) {
    if (isNil(template)) {
      template = this.template;
    }
    this.res.render(template, data);
  }
}
