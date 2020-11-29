import { Injectable } from '@angular/core';
import { isNil } from '@blue-paper/shared-commons';
import { BpaEnabled, BpaMenuPlace, BpaTemplate } from '@blue-paper/ui-editor-backend';

/**
 * Data item
 *
 * * **key** is the read value and it is unique
 * * **label** is the translate key
 */
export class DataItem<T> {
  constructor(public readonly key: T, public readonly label: string) {
  }
}

/**
 * Definition of data item list
 */
export type DataItemList<T> = DataItem<T>[];

/**
 * The service delivery the menu data for select box and auto complete controls
 */
@Injectable()
export class MenuDataService {

  private _templateList: DataItemList<BpaTemplate> = null;

  private _enabledList: DataItemList<BpaEnabled> = null;

  private _menuPlaceList: DataItemList<BpaMenuPlace> = null;

  /**
   * Get the list of template.
   *
   * **NOTE**: It is a copy of the original list. A change on the returned list has no affect to the original list.
   */
  get templateList(): DataItemList<BpaTemplate> {
    if (isNil(this._templateList)) {
      this.buildTemplateList();
    }
    return [...this._templateList]
  }

  /**
   * Get list of enabled values
   *
   * **NOTE**: It is a copy of the original list. A change on the returned list has no affect to the original list.
   */
  get enabledList(): DataItemList<BpaEnabled> {
    if (isNil(this._enabledList)) {
      this.buildEnabledList();
    }
    return [...this._enabledList];
  }

  /**
   * The the list of menu place values
   *
   * *NOTE**: It is a copy of the original list. A change on the returned list has no affect to the original list.
   */
  get menuPlaceList(): DataItemList<BpaMenuPlace> {
    if (isNil(this._menuPlaceList)) {
      this.buildMenuPlaceList();
    }
    return [ ...this._menuPlaceList];
  }


  private buildTemplateList(): void {
    this._templateList = [
      new DataItem<BpaTemplate>(BpaTemplate.Index, 'app.data.menu.template.page'),
      new DataItem<BpaTemplate>(BpaTemplate.Blog, 'app.data.menu.template.blog'),
    ];
  }

  private buildEnabledList(): void {
    this._enabledList = [
      new DataItem<BpaEnabled>(BpaEnabled.Y, 'app.data.menu.enabled.yes'),
      new DataItem<BpaEnabled>(BpaEnabled.N, 'app.data.menu.enabled.no'),
    ];
  }

  private buildMenuPlaceList(): void {
    this._menuPlaceList = [
      new DataItem<BpaMenuPlace>(BpaMenuPlace.Navbar, 'app.data.menu.menuPlace.navbar'),
      new DataItem<BpaMenuPlace>(BpaMenuPlace.Footer, 'app.data.menu.menuPlace.footer'),
      new DataItem<BpaMenuPlace>(BpaMenuPlace.Hidden, 'app.data.menu.menuPlace.hidden'),
    ]
  }
}
