import { isNil } from '@blue-paper/shared-commons';

export type PathParams = string[] | {[key: string]: string};

/**
 * Get the first pathname of the path parameter
 *
 * @param {PathParams} pathParams the path of the url
 * @returns {string} the  first path.
 */
export function getFirstPathname(pathParams: PathParams): string {
  if (isNil(pathParams)) {
    return null;
  }
  if (Array.isArray(pathParams)) {
    return pathParams[0];
  }
  if (pathParams['0']) {
    return pathParams['0'];
  }
  const keys = Object.keys(pathParams);
  if (keys.length > 0) {
    return pathParams[keys[0]];
  }
  return null;
}
