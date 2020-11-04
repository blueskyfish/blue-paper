import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';

/**
 * Access to the localstorage from the browser. It sets a prefix to the key names.
 */
@Injectable()
export class StorageFacadeService {

  private readonly prefix = 'blue.paper';

  private static get storage(): Storage {
    return window.localStorage;
  }

  hasItem(item: string): boolean {
    return !isNil(StorageFacadeService.storage.getItem(this.buildKey(item)));
  }

  getItem(item: string): string {
    return StorageFacadeService.storage.getItem(this.buildKey(item));
  }

  updateItem(item: string, value: string): void {
    if (value) {
      StorageFacadeService.storage.setItem(this.buildKey(item), value);
    }
  }

  removeItem(item: string): void {
    StorageFacadeService.storage.removeItem(this.buildKey(item));
  }

  private buildKey(item: string): string {
    return `${this.prefix}.${item}`;
  }
}
