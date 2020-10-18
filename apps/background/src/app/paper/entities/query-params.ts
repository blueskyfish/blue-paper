
export class QueryParams {

  constructor(public readonly queryParams: { [name: string]: string | string[] }) {
  }

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

  toString(): string {
    return JSON.stringify(this.queryParams);
  }
}
