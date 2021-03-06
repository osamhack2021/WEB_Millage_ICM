import {ResultObject} from 'src/common/common.interface';

export interface MessageBoxData{
    id: number;
    senderId: number;
    senderName: string;
    message: string;
    time: string;
}

export interface MessageData{
  id: number;
  receiverId: number;
  senderId: number;
  senderName: string;
  message: string;
  time: string;
}

export interface MessageRO extends ResultObject {
  messageboxes?: MessageBoxData[];
  messages?: MessageData[];
}

