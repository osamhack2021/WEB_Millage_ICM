import {createAction, createAsyncAction} from 'typesafe-actions';
import {AdminState} from './types';

export const GET_USERLIST_REQUEST =
  'ADMIN/GET_USERLIST_REQUEST' as const;

export const GET_USERLIST_SUCCESS =
  'ADMIN/GET_USERLIST_SUCCESS' as const;

export const GET_USERLIST_FAIL=
  'ADMIN/GET_USERLIST_FAIL' as const;

export const SET_PAGE_STATE =
'ADMIN/SET_PAGE_STATE' as const;

export const AUTH_USER_REQUEST =
  'ADMIN/AUTH_USER_REQUEST' as const;

export const AUTH_USER_SUCCESS =
  'ADMIN/AUTH_USER_SUCCESS' as const;

export const AUTH_USER_FAIL=
  'ADMIN/AUTH_USER_FAIL' as const;

export const getUserlistAsync = createAsyncAction(
    GET_USERLIST_REQUEST,
    GET_USERLIST_SUCCESS,
    GET_USERLIST_FAIL,
)<string, AdminState, AdminState>();

export const authUserAsync = createAsyncAction(
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,
)<number, AdminState, AdminState>();


export const GET_UNITLIST_REQUEST =
  'ADMIN/GET_UNITLIST_REQUEST' as const;

export const GET_UNITLIST_SUCCESS =
  'ADMIN/GET_UNITLIST_SUCCESS' as const;

export const GET_UNITLIST_FAIL=
  'ADMIN/GET_UNITLIST_FAIL' as const;

export const AUTH_UNIT_REQUEST =
  'ADMIN/AUTH_UNIT_REQUEST' as const;

export const AUTH_UNIT_SUCCESS =
  'ADMIN/AUTH_UNIT_SUCCESS' as const;

export const AUTH_UNIT_FAIL=
  'ADMIN/AUTH_UNIT_FAIL' as const;

export const getUnitlistAsync = createAsyncAction(
    GET_UNITLIST_REQUEST,
    GET_UNITLIST_SUCCESS,
    GET_UNITLIST_FAIL,
)<undefined, AdminState, AdminState>();

export const authUnitAsync = createAsyncAction(
    AUTH_UNIT_REQUEST,
    AUTH_UNIT_SUCCESS,
    AUTH_UNIT_FAIL,
)<number, AdminState, AdminState>();


export const setPageStateAction = createAction(
    SET_PAGE_STATE,
)<string>();
