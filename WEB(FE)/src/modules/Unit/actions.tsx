import {createAsyncAction} from 'typesafe-actions';
import {UnitState} from './types';
export const GET_UNIT_LIST_REQUEST =
'UNIT/GET_UNIT_LIST_REQUEST' as const;

export const GET_UNIT_LIST_SUCCESS =
'UNIT/GET_UNIT_LIST_SUCCESS' as const;

export const GET_UNIT_LIST_FAIL =
'UNIT/GET_UNIT_LIST_FAIL' as const;

export const getUnitListAsync = createAsyncAction(
    GET_UNIT_LIST_REQUEST,
    GET_UNIT_LIST_SUCCESS,
    GET_UNIT_LIST_FAIL,
)<undefined, UnitState, UnitState>();
