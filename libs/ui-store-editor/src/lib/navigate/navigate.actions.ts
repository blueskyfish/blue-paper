import { PathName } from '@blue-paper/ui-commons';
import { createAction, props } from '@ngrx/store';

export class NavigateActions {

  static navigate = createAction(
    '[Navigate] navigate to route',
    props<{ paths: PathName[]}>()
  )
}
