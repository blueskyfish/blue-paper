import { BpaLoginPayload, BpaUserInfo } from '@blue-paper/ui-editor-backend';
import { createAction, props } from '@ngrx/store';

export class UserActions {

  static sendLogin = createAction(
    '[User] sent login payload',
    props<{ payload: BpaLoginPayload }>()
  );

  static userInfo = createAction(
    '[User] get user info',
    props<BpaUserInfo>()
  );
}
