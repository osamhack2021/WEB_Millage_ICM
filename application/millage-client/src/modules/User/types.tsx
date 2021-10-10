import {ActionType} from 'typesafe-actions';
import * as actions from './actions';
import {Socket} from 'socket.io-client';
export interface UnitData{
    id: number;
    name: string;
}

export interface UserRoleData{
    id: number;
    name: string;
}

export interface UserData {
    id: number;
    username: string;
    email: string;
    fullname: string;
    nickname: string;
    phonenumber?: string;
    unit: UnitData;
    role: UserRoleData;
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
    unitId: number;
    password: string;
    roleId: number;
    phonenumber?: string;
    unitName?: string;
}

export interface UserValidateData {
    username?: string;
    email?: string;
    nickname?: string;
    phonenumber?: string;
}

export interface UserState {
    result: string;
    session?: UserData;
    message?: string;
    socket?: Socket;
    unread?: number;
    validate?: string;
}

export type UserAction = ActionType<typeof actions>;

