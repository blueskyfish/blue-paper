import { ActionReducerMap} from '@ngrx/store';
import { AppState } from './app.state';

// Reducers
import * as fromLoader from './loader/loader.reducer';
import * as fromMessage from './message/message.reducer';
import * as fromUser from './user/user.reducer';

export const initialState: AppState = {
  [fromLoader.LOADER_FEATURE_KEY]: fromLoader.initialState,
  [fromMessage.MESSAGE_FEATURE_KEY]: fromMessage.initialState,
  [fromUser.USER_FEATURE_KEY]: fromUser.initialUserState,
}

export const reducer: ActionReducerMap<AppState> = ({
  [fromLoader.LOADER_FEATURE_KEY]: fromLoader.reducer,
  [fromMessage.MESSAGE_FEATURE_KEY]: fromMessage.reducer,
  [fromUser.USER_FEATURE_KEY]: fromUser.reducerUser,
});
