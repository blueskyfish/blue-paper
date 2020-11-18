import { createAction } from '@ngrx/store';

export class LoaderActions {

  static showLoader = createAction('[Loader] show loader');

  static hideLoader = createAction('[Loader] hide loader');
}
