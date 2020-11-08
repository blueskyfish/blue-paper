
export type MessageKind = 'notify' | 'error';

export interface IMessage {
  kind: MessageKind;
  title: string;
  message: string;
  data?: any;
}
