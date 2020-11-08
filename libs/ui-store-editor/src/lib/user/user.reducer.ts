import { Action, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

export const USER_FEATURE_KEY = 'user';

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
  id: null,
  name: null,
  email: null,
  roles: null,
};

const userReducer = createReducer(initialUserState,
  on(UserActions.userInfo, (state, {id, name, email, roles}) => (
    {
      ...state,
      id,
      name,
      email,
      roles
    }
  )),
);

export function reducerUser(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
