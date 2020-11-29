import { createAction, props } from '@ngrx/store';
import { BpaEditorMenuItem } from '@blue-paper/ui-editor-backend';

export class MenuActions {

  /**
   * Initial the menu list
   */
  static initMenuList = createAction('[Editor/Menu] initialize menu');

  static updateMenuList = createAction(
    '[Editor/Menu] update tree root menu list',
    props<{list: BpaEditorMenuItem[]}>()
  );
}
