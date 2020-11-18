
export type MessageKind = 'notify' | 'error';

export interface IMessage {
  category: string;
  kind: MessageKind;
  title: string;
  message: string;
  data?: any;
}
