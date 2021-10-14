import {Role} from '@constants';
import {UserData} from '@modules/User/types';
import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface UnitData{
    id: number;
    name: string;
    isConfiremd: boolean;
    admins?: UserData[];
}

export interface BoardData{
    id: number;
    title: string;
    description: string;
    auth: boolean;
    pollAllowed: boolean;
    recruitAllowed: boolean;
    imageAllowed: boolean;
    createdAt: Date;
}

export interface BoardUpdateData{
    id: number;
    title: string;
    description: string;
    auth: boolean;
    pollAllowed: boolean;
    recruitAllowed: boolean;
    imageAllowed: boolean;
}

export interface BoardInsertData{
    title: string;
    description: string;
    auth: boolean;
    pollAllowed: boolean;
    recruitAllowed: boolean;
    imageAllowed: boolean;
}

export interface AdminState {
    result: string;
    role?: string;
    users?: UserData[];
    message?: string;
    page?: string;
    units?: UnitData[];
    boards?: BoardData[];
}


export type AdminAction = ActionType<typeof actions>;

