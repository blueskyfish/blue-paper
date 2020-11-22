import { isNil } from '@blue-paper/shared-commons';
import { createSelector } from '@ngrx/store';
import { IUserName } from './user.entities';
import { UserState } from './user.state';
import { USER_FEATURE_KEY, UserPartialState } from './user.reducer';

const selectUser = (state: UserPartialState) => state[USER_FEATURE_KEY];

export class UserQueries {

  /**
   * Get the current user
   */
  static readonly selectUserName$ = createSelector(
    selectUser,
    (state: UserState): IUserName => (
      {
        id: state.id,
        name: state.name
      }
    )
  );

  /**
   * Check if the user is available
   */
  static readonly selectUserAvailable$ = createSelector(
    selectUser,
    (state: UserState): boolean => (
      !isNil(state.id) || !isNaN(state.id)
    )
  );

  /**
   * Get the user roles
   */
  static readonly selectUserRoles$ = createSelector(
    selectUser,
    (state: UserState): string[] => (
      isNil(state.roles) ? null : state.roles
    )
  );
}
