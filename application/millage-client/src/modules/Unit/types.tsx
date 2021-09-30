import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface UnitObject{
    name: string;
    count: number;
}

export interface UnitState{
    result: string;
    message?: string;
    units?: UnitObject[];
}

export type UnitAction = ActionType<typeof actions>;

