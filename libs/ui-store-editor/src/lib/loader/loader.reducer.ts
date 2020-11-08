import { Action, createReducer, on } from '@ngrx/store';
import { LoaderActions } from './loader.actions';
import { DisplayLoader, LoaderState } from './loader.state';

export const LOADER_FEATURE_KEY = 'loader';

export interface LoaderPartialSate {
  readonly [LOADER_FEATURE_KEY]: LoaderState;
}

export const initialState: LoaderState = {
  display: DisplayLoader.Hide,
};

const loaderReducer = createReducer(
  initialState,
  on(LoaderActions.showLoader, () => (
    {
      display: DisplayLoader.Show
    }
  )),
  on(LoaderActions.hideLoader, () => (
    {
      display: DisplayLoader.Hide
    }
  )),
);

export function reducer(state: LoaderState | undefined, action: Action) {
  return loaderReducer(state, action);
}
