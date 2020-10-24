import { QueryType } from './query-types';

export class QueryParams {

  /**
   * Create a query parameter instance
   *
   * @param {QueryType} params
   */
  constructor(public readonly params: QueryType) {
  }

  /**
   * Get the value or the array of values of the query parameters from given name
   * @param name the query name
   * @param defValue the default value if the query name is not exist
   */
  query(name: string, defValue: string): string | string[] {
    return this.params[name] || defValue;
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

  toString(): string {
    return JSON.stringify(this.params);
  }
}

export function toQuery(query: QueryType): QueryParams {
  return new QueryParams(query);
}
