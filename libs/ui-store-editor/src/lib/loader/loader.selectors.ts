import { createSelector } from '@ngrx/store';
import { LOADER_FEATURE_KEY, LoaderPartialSate } from './loader.reducer';
import { LoaderState } from './loader.state';


const selectLoader = (state: LoaderPartialSate) => state[LOADER_FEATURE_KEY];

/**
 * Queries for the
 */
export class LoaderQuery {

  static readonly displayLoader$ = createSelector(
    selectLoader,
    (state: LoaderState) => state.display
  );
}
