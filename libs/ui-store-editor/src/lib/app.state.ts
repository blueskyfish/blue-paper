import { LoaderState } from './loader';
import { LOADER_FEATURE_KEY } from './loader/loader.reducer';
import { MessageState } from './message';
import { MESSAGE_FEATURE_KEY } from './message/message.reducer';
import { UserState } from './user';
import { USER_FEATURE_KEY } from './user/user.reducer';

export interface AppState {
  [LOADER_FEATURE_KEY]: LoaderState;
  [MESSAGE_FEATURE_KEY]: MessageState;
  [USER_FEATURE_KEY]: UserState
}
