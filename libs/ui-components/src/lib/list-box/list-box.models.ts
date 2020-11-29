import { Observable } from 'rxjs';

export enum CommandOrientation {
  Horizontal = 'horizontal',
  Vertical= 'vertical',
}

/**
 * A element for list-box
 */
export class ListBoxItem<T> {

  get value(): T {
    return this._value;
  }

  get label(): string {
    return this._label;
  }

  constructor(public readonly id: number, private _value: T, private _label: string) {}

  update(value: any, label: string): void {
    this._value = value;
    this._label = label;
  }
}

/**
 * An array of list-box items.
 */
export type ListBoxItems<T> = ListBoxItem<T>[];
