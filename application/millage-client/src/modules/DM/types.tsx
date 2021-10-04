import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface MessageBox {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  time: string;
}

export interface DMState {
  result: string;
  message: string;
  messageboxes?: MessageBox[];
};

export type DMAction = ActionType<typeof actions>;
