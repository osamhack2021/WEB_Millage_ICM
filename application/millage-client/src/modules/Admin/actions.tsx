import {createAsyncAction} from 'typesafe-actions';
import {AdminState} from './types';

export const GET_USERLIST_REQUEST =
  'ADMIN/GET_USERLIST_REQUEST' as const;

export const GET_USERLIST_SUCCESS =
  'ADMIN/GET_USERLIST_SUCCESS' as const;

export const GET_USERLIST_FAIL=
  'ADMIN/GET_USERLIST_FAIL' as const;


export const getUserlistAsync = createAsyncAction(
    GET_USERLIST_REQUEST,
    GET_USERLIST_SUCCESS,
    GET_USERLIST_FAIL,
)<string, AdminState, AdminState>();
