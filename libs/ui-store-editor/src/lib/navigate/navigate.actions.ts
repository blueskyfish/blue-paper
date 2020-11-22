import { PathSegments } from '@blue-paper/ui-commons';
import { createAction, props } from '@ngrx/store';

export class NavigateActions {

  /**
   * Navigates to the given path route
   */
  static navigate = createAction(
    '[Navigate] navigate to route',
    props<{ pathSegments: PathSegments}>()
  )
}
