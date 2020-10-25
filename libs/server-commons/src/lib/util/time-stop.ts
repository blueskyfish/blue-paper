
const NS_PER_SEC = 1e9;
const MILLI_PER_SEC = 1e6;

/**
 * Stopping time durations
 */
export class TimeStop {

  private readonly start = process.hrtime();

  /**
   * Returns the duration in milliseconds
   * @returns {number}
   */
  duration(): number {
    const diff = process.hrtime(this.start);
    const nanoSecs = diff[0] * NS_PER_SEC + diff[1];

    return parseFloat((nanoSecs / MILLI_PER_SEC).toFixed(2));
  }
}

/**
 * Start a time stop instance.
 *
 * @returns {TimeStop}
 */
export function timeStop(): TimeStop {
  return new TimeStop();
}
