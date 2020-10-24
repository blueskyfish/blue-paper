
const NS_PER_SEC = 1e9;
const MILLI_PER_SEC = 1e6;

/**
 * Stopping time durations
 */
export class Stopper {

  private readonly start = process.hrtime();

  stop(): number {
    const diff = process.hrtime(this.start);
    const nanoSecs = diff[0] * NS_PER_SEC + diff[1];

    return parseFloat((nanoSecs / MILLI_PER_SEC).toFixed(2));
  }
}

/**
 * Start an stopper.
 *
 * @returns {Stopper}
 */
export function startStopper(): Stopper {
  return new Stopper();
}
