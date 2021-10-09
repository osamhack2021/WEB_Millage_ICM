import {Role} from '@constants';
import {UserData} from '@modules/User/types';
import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface AdminState {
    result: string;
    role?: string;
    users?: UserData[];
    message?: string;
}


export type AdminAction = ActionType<typeof actions>;

