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

export interface PlaceData{
    id: number;
    name: string;
    description: string;
    seats: boolean;
    unitId: number;
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
    unitId?: number;
}


export interface PlaceUpdateData{
    id: number;
    name: string;
    description: string;
    seats: number;
}

export interface PlaceInsertData{
    name: string;
    description: string;
    seats: number;
}

export interface AdminState {
    result: string;
    role?: string;
    users?: UserData[];
    message?: string;
    page?: string;
    units?: UnitData[];
    boards?: BoardData[];
    places?: PlaceData[];
}

export type AdminAction = ActionType<typeof actions>;

