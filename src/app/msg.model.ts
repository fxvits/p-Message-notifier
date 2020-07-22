export interface IMyMessage {
  key: string;
  data: string;
  expireOn: Date;
}

export interface INotification {
  msg: IMyMessage;
  count: number;
}