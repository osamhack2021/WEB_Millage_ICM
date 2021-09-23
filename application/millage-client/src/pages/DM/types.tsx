import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface MessageBox {
    id: number;
    name: string;
    content: string;
    date: string;
}

export interface DMState {
  messageboxes: MessageBox[];
};

export type DMAction = ActionType<typeof actions>;
