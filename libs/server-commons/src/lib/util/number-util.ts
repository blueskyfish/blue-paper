import { Logger } from '@nestjs/common';

export function toInt(s: string| number): number {
  if (typeof s === 'number') {
    return s;
  }
  if (typeof s !== 'string') {
    Logger.warn(`Value "${s}" is not a string or number`, 'Util');
    return NaN;
  }
  try {
    const v = parseInt(s, 10);
    if (`${v}` === s) {
      return v;
    }
    return NaN;
  } catch (e) {
    Logger.error(`parse value "${s}" to int is failed => ${e.message}`, null, 'Util');
    return NaN;
  }
}
