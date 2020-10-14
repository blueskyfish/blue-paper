import { toInt } from '../util/number-util';

export class EnvValue {

  get hasValue(): boolean {
    return !!this.value;
  }

  get asString(): string {
    return `${this.value}`;
  }

  get asNumber(): number {
    return toInt(this.value);
  }

  constructor(private readonly value: string) {
  }
}

