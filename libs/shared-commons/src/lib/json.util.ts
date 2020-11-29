/**
 * Exception save util for json operations
 */
export class JsonUtil {

  /**
   * Parse the given text into an json object from given type
   *
   * @param {string} text the json string
   * @param {T} defValue the default value if an error has occurred
   * @returns {T} the value from given type
   */
  static parse<T>(text: string, defValue: T = null): T {
    try {
      return JSON.parse(text);
    } catch (e) {
      return defValue;
    }
  }
}
