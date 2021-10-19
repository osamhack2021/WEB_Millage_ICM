import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface MessageBox {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  time: string;
  unread?: number;
}

export interface MessageData{
  id: number;
  receiverId: number;
  senderId: number;
  senderName: string;
  message: string;
  time: string;
}

export interface SendMessageData{
  receiverId: number;
  anonymous: boolean;
  message: string;
}

export interface UserData{
  id: number;
  nickname: string;
}

export interface DMState {
  result: string;
  message?: string;
  messageboxes?: MessageBox[];
  messages?: MessageData[];
  users?: UserData[];
  newMessage?: SendMessageData;
};

export type DMAction = ActionType<typeof actions>;
