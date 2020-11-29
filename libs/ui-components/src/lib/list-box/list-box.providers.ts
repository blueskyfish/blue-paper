import { Observable } from 'rxjs';
import { ListBoxItem } from './list-box.models';

/**
 * Provider of convert values into / from list-box item.
 */
export interface ListBoxProvider<T> {

  /**
   * Get the list item from given value
   * @param {number} id the unique id of the item
   * @param {*} value the value
   * @returns {ListBoxItem<*>} the list-box item
   */
  getItem(id: number, value: T): ListBoxItem<T>;

  /**
   * Get the label from the given value
   * @param {*} value the value
   * @returns {string} the label
   */
  getLabel(value: T): string;

  /**
   * Get the value from given list-box item
   * @param {ListBoxItem<*>} item the list-box item
   * @returns {*} the value
   */
  getValue(item: ListBoxItem<T>): T;
}

export class StringListBoxProvider implements ListBoxProvider<string>{

  getItem(id: number, value: string): ListBoxItem<string> {
    return new ListBoxItem<string>(id, value, value);
  }

  getLabel(value: string): string {
    return value;
  }

  getValue(item: ListBoxItem<string>): string {
    return item.value;
  }
}

/**
 * The change provider for the list-box
 *
 * **NOTE**: All observable must not unsubscribe
 */
export interface ListBoxChangeProvider<T> {

  /**
   * Add a new value
   * @returns {Observable<*>}
   */
  addListBoxValue(): Observable<T>;

  /**
   * Edit the given value and if the subscribes value is not null, then replace it with the item in the list.
   *
   * @param {*} value the value for edit
   * @returns {Observable<*>} the changed item or null
   */
  editListBoxValue(value: T): Observable<T>;

  /**
   * Delete the given value
   * @param {*} value the value
   * @returns {Observable<boolean>} `true` means: delete this value
   */
  deleteListBoxValue(value: T): Observable<boolean>;
}

export class ListBoxIdGenerator {
  constructor(private start: number = 0) {
  }

  next(): number {
    return ++this.start;
  }
}
