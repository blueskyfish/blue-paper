import * as moment from 'moment';
import { Moment } from 'moment';
import { isDate, isString } from 'util';
import { isNil } from './lo-util';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm';
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Callback pattern for the {@link DateUtil.repeatUntil} function
 */
export type RepeatUntilFunc = (date: Moment) => Moment;

/**
 * An utility class for date and datetime functions
 */
export class DateUtil {
  static now(): Moment {
    return moment();
  }

  static formatTimestamp(m?: Moment | Date): string {
    if (isDate(m)) {
      m = moment(m);
    }
    if (!m) {
      m = DateUtil.now();
    }
    return m.format(TIMESTAMP_FORMAT);
  }

  static formatDate(m: Moment | Date | string): string {
    if (isString(m) || isDate(m)) {
      m = moment(m);
    }
    return (m as Moment).format(DATE_FORMAT);
  }

  static format(m: Moment, format?: string) {
    if (!format) {
      format = DATE_FORMAT;
    }

    return m.format(format);
  }

  static formatTime(m: Moment): string {
    return m.format(TIME_FORMAT);
  }

  static toMoment(date: string, time: string): Moment {
    const d = moment(date, DATE_FORMAT);
    const m = moment(time, TIME_FORMAT);

    return d.add(m.hour(), 'hour').add(m.minute(), 'minute');
  }

  static fromDate(date: string | Date): Moment {
    if (isDate(date)) {
      return moment(date);
    }
    return moment(date, DATE_FORMAT);
  }

  static dateTime(d: Date): Moment {
    return moment(d);
  }

  static formatDateTime(m?: Moment): string {
    if (!m) {
      m = DateUtil.now();
    }
    return `${DateUtil.formatDate(m)} ${DateUtil.formatTime(m)}`;
  }

  static date1970(): Moment {
    return DateUtil.fromDate('1970-01-01');
  }

  /**
   * Repeat until the callback is return `null`.
   *
   * @param {moment.Moment} start the start date (moment)
   * @param {RepeatUntilFunc} func the callback function
   */
  static repeatUntil(start: Moment, func: RepeatUntilFunc): void {
    let date = start;
    let running = true;
    while (running) {
      date = func(date.clone());
      if (isNil(date)) {
        running = false;
      }
    }
  }
}
