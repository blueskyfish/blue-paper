import { createAction, props } from '@ngrx/store';
import { BpaTreeRootMenu } from '@blue-paper/ui-editor-backend';

export class MenuActions {

  static initMenuList = createAction('[Editor/Menu] initialize menu');

  static updateTreeMenuList = createAction(
    '[Editor/Menu] update tree root menu list',
    props<{list: BpaTreeRootMenu[]}>()
  );
}
