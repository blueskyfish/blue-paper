
export function toInt(s: string| number): number {
  if (typeof s === 'number') {
    return s;
  }
  if (typeof s !== 'string') {
    return NaN;
  }
  try {
    const v = parseInt(s, 10);
    if (`${v}` === s) {
      return v;
    }
    return NaN;
  } catch (e) {
    return NaN;
  }
}
