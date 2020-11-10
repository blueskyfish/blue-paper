import { Action, createReducer, on } from '@ngrx/store';
import { MessageActions } from './message.actions';
import { MessageState } from './message.state';

export const MESSAGE_FEATURE_KEY = 'message';

export interface MessagePartialState {
  [MESSAGE_FEATURE_KEY]: MessageState;
}

export const initialState: MessageState = {
  list: []
};

const messageReducer = createReducer(
  initialState,
  on(MessageActions.appendError, (state, { message }) => (
    {
      list: [ message, ...state.list ]
    }
  )),
  on(MessageActions.removeCategory, (state, { category }) => (
    {
      list: state.list.filter(m => m.category !== category),
    }
  ))
);

export function reducer(state: MessageState | undefined, action: Action) {
  return messageReducer(state, action);
}
