import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LoaderPartialSate } from './loader.reducer';
import { LoaderQuery } from './loader.selectors';
import { DisplayLoader } from './loader.state';


@Injectable()
export class LoaderFacadeService {

  /**
   * Listen for the change of display loader property from the {@link LoaderState}
   * @returns {Observable<DisplayLoader>}
   */
  get displayLoader$(): Observable<DisplayLoader> {
    return this.store
      .pipe(
        select(LoaderQuery.displayLoader$),
        distinctUntilChanged()
      );
  }

  constructor(private store: Store<LoaderPartialSate>) {
  }
}
