import { createSelector } from '@ngrx/store';
import { IMessage } from './message.entities';
import { MESSAGE_FEATURE_KEY, MessagePartialState } from './message.reducer';
import { MessageState } from './message.state';

const selectMessage = (state: MessagePartialState) => state[MESSAGE_FEATURE_KEY];

export class MessageQueries {

  static readonly selectMessage = (category: string) => createSelector(
    selectMessage,
    (state: MessageState): IMessage[] => (
      state.list.filter(m => m.category === category)
    )
  );
}
