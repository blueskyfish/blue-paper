import { createAction, props } from '@ngrx/store';
import { IMessage } from './message.entities';

export class MessageActions {

  static readonly appendError = createAction(
    '[Message] append error',
    props<{ message: IMessage }>()
  )
}
