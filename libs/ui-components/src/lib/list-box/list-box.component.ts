import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNil } from '@blue-paper/shared-commons';
import { CommandOrientation, ListBoxItem, ListBoxItems, } from './list-box.models';
import {
  ListBoxChangeProvider,
  ListBoxIdGenerator,
  ListBoxProvider,
  StringListBoxProvider
} from './list-box.providers';

/**
 * Define a list-box component with action button (**add**, **edit**, **delete**).
 *
 * There are provider for wrap the different actions like show item, edit item etc
 *
 * * {@link ListBoxProvider} convert into or from list-box item
 * * {link ListBoxChangeProvider} handle the calls for external function to add, edit or delete an list-box item
 */
@Component({
  selector: 'bpa-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListBoxComponent),
      multi: true,
    }
  ]
})
export class ListBoxComponent implements OnInit, ControlValueAccessor {

  private idGen = new ListBoxIdGenerator();

  /**
   * Disabled or enabled the list-box control
   */
  disabled: boolean;

  /**
   * The list of list-box items
   */
  items: ListBoxItems<any>;

  /**
   * The css style height of the item-list
   */
  get styleListHeights() {
    return {
      height: `${this.visibleItems * this.itemHeight}px`,
      'min-height': `${this.visibleItems * this.itemHeight}px`,
      'max-height': `${this.visibleItems * this.itemHeight}px`
    };
  }

  /**
   * Provider converts the value into / from list-box item
   */
  @Input()
  provider: ListBoxProvider<any>;

  /**
   * The change provider for the list-box items
   */
  @Input()
  changeProvider: ListBoxChangeProvider<any>;

  @Input()
  commandOrientation: CommandOrientation = CommandOrientation.Vertical;

  /**
   * How many items are always visible
   * @type {number}
   */
  @Input()
  visibleItems = 5;

  /**
   * Define the item height for every list-box item
   * @type {number}
   */
  @Input()
  itemHeight = 36;

  /**
   * The selected list-box item
   */
  selected: ListBoxItem<any> = null;

  /**
   * Disabled **edit and **delete** action button if the form control is disabled or no item is selected.
   *
   * **NOTE** action buttons always disabled if there is no change provider
   */
  get disabledAction(): boolean {
    return (this.disabled || isNil(this.selected)) || isNil(this.changeProvider);
  }

  /**
   * Disabled **add** action button if the form control is disabled
   *
   * **NOTE** action button always disabled if there is no change provider
   */
  get disabledAddAction(): boolean {
    return this.disabled || isNil(this.changeProvider);
  }

  ngOnInit(): void {
    if (isNil(this.provider)) {
      // use the string provider
      this.provider = new StringListBoxProvider();
    }
  }

  /**
   * User select the item
   */
  selectItem(item: ListBoxItem<any>): void {
    if (!this.disabled) {
      // console.log('> Debug: select Item =>', item);
      this.selected = item;
    }
  }

  /**
   * Edit the selected list-box item
   */
  editItem(): void {
    this.changeProvider.editListBoxValue(this.selected.value)
      .subscribe((newValue) => {
        this.selected.update(newValue, this.provider.getLabel(newValue));
        this.updateValues();
      });
  }

  /**
   * Delete the selected list-box item
   */
  deleteItem(): void {
    this.changeProvider.deleteListBoxValue(this.selected.value)
      .subscribe( (isDelete) => {
        if (isDelete) {
          this.items = this.items.filter(item => item.id !== this.selected.id);
          this.updateValues();
        }
      })
  }

  /**
   * Add a new list box item
   */
  addItem(): void {
    this.changeProvider.addListBoxValue()
      .subscribe((value) => {
        // console.log('> Debug: Add =>', value);
        if (!isNil(value)) {
          const item = this.provider.getItem(this.idGen.next(), value);
          this.items.push(item);
          this.selected = item;
          this.updateValues();
        }
      })
  }

  writeValue(items: any[]): void {
    // console.log('> Debug: Write values =>', items);
    if (Array.isArray(items)) {
      this.items = items.map((item) => this.provider.getItem(this.idGen.next(), item));
    }
  }

  registerOnChange(fn: any): void {
    this.doChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.doTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.disabled !== isDisabled) {
      this.disabled = isDisabled;
    }
    if (this.disabled) {
      this.selected = null;
    }
  }

  private doChange = (items: any[]) => {};
  private doTouch = () => {};

  private updateValues() {
    const values = this.items.map(item => this.provider.getValue(item));
    // console.log('> Debug: Update values =>', values);
    this.doChange(values);
    this.doTouch();
  }
}
