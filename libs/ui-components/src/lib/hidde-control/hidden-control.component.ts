import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bpa-hidden-control',
  template: `<input type="hidden" [(ngModel)]="value">`,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HiddenControlComponent),
      multi: true,
    }
  ]
})
export class HiddenControlComponent implements ControlValueAccessor {

  private _value: any;

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.doChange(value);
  }

  constructor() { }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.doChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.doTouch = fn;
  }

  private doChange = (value: any) => {};
  private doTouch = () => {};
}
