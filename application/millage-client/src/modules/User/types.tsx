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
    auth: number;
}

export interface UserLoginData {
    username: string;
    password: string;
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
    auth: number;
}

export interface UserState {
    result: string;
    session?: UserData;
    message?: string;
}

export type UserAction = ActionType<typeof actions>;

