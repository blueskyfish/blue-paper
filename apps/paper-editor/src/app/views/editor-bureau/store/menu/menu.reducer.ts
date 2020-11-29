import { BpaEditorMenuItem } from '@blue-paper/ui-editor-backend';
import { Action, createReducer, on } from '@ngrx/store';
import { MenuActions } from './menu.actions';

/**
 * The list of menu items
 */
export type MenuState = BpaEditorMenuItem[];

export const MenuFeatureKey = 'menu';

export interface MenuPartialState {
  [MenuFeatureKey]: MenuState;
}

export const initialState: MenuState = [];

const menuReducer = createReducer(
  initialState,
  on(MenuActions.updateMenuList, (state, {list}) => ([...list])),
);

export function reducer(state: MenuState, action: Action) {
  return menuReducer(state, action)
}
