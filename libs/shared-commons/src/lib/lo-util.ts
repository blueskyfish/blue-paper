/*!
 * Small helper class for replace [lodash](https://lodash.com/)
 */

/* eslint-disable */
export function isNil(v: any): boolean {
  return v === null || typeof v === 'undefined';
}

export function isString(v: any): boolean {
  return !isNil(v) && typeof v.valueOf() === 'string';
}

export function isDate(d: any): boolean {
  return d instanceof Date;
}

export function isFunction(f: any): boolean {
  return f && typeof f === 'function';
}

export function toLower(s: string): string {
  return s ? s.toLowerCase() : null;
}

export function toUpper(s: string): string {
  return s ? s.toUpperCase() : null;
}

export function trim(s: string): string {
  return s ? s.trim() : null;
}

export function startsWith(s: string, search: string, offset?: number): boolean {
  if (isString(s) && isString(search)) {
    return typeof offset === 'number' ? s.startsWith(search, offset) : s.startsWith(search);
  }
  return false;
}

export function endsWidth(s: string, search: string, offset?: number): boolean {
  if (isString(s) && isString(search)) {
    return typeof offset === 'number' ? s.endsWith(search, offset) : s.endsWith(search);
  }
  return false;
}

export function get<T>(obj: object, path: string, defaultValue?: T): T {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

export function size(s: string | object | Array<any>): number {
  if (isString(s)) {
    return (s as string).length;
  }
  if (Array.isArray(s)) {
    return (s as []).length;
  }
  if (typeof s === 'object' && !isNil(s)) {
    return Object.keys(s).length;
  }
  return -1;
}

/**
 * Check if the value is empty
 *
 * * string: The string has the length of `0`
 * * array: The array has the length of `0`
 * * object: The object has no public attributes
 *
 * @param {*[] | string | object} v the value of string or array
 * @returns {boolean} `true` means, the string or array is empty.
 */
export function isEmpty(v: any[] | string | object): boolean {
  if (isNil(v)) {
    return true;
  }
  if (Array.isArray(v)) {
    return v.length === 0;
  }
  if (typeof v === 'string') {
    return v.length === 0;
  }
  return Object.keys(v).length === 0;
}

/* eslint-enable */
