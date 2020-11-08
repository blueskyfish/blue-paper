import { QueryType } from './query-types';

/**
 * Query parameters as map with the key and there values
 */
export class QueryParams {

  /**
   * Create a query parameter instance
   *
   * @param {QueryType} params
   */
  protected constructor(public readonly params: QueryType) {
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
   * Get the value of the query parameters as list
   *
   * @param {string} name the query parameter
   * @param {string} defValue the default value
   * @returns {string[]} the list of values
   */
  asList(name: string, defValue: string): string[] {
    const value = this.query(name, defValue);
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
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

  /**
   * Create an instance of query parameters
   * @param {QueryType} query
   * @returns {QueryParams}
   */
  static toQuery(query: QueryType): QueryParams {
    return new QueryParams(query);
  }
}
