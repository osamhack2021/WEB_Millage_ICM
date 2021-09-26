import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface UserData {
    id: number;
    username: string;
    email: string;
    fullname: string;
    nickname: string;
    phonenumber: string;
    unitId: number;
}

export interface UserSubmitData {
    id: number;
    username: string;
    email: string;
    fullname: string;
    nickname: string;
    phonenumber: string;
    unitId: number;
    password: string;
}

export interface UserState {
    result: string;
}

export type UserAction = ActionType<typeof actions>;

