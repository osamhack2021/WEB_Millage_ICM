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

export const DELETE_UNIT_REQUEST =
  'ADMIN/DELETE_UNIT_REQUEST' as const;

export const DELETE_UNIT_SUCCESS =
  'ADMIN/DELETE_UNIT_SUCCESS' as const;

export const DELETE_UNIT_FAIL=
  'ADMIN/DELETE_UNIT_FAIL' as const;

export const DELETE_USER_REQUEST =
  'ADMIN/DELETE_USER_REQUEST' as const;

export const DELETE_USER_SUCCESS =
  'ADMIN/DELETE_USER_SUCCESS' as const;

export const DELETE_USER_FAIL=
  'ADMIN/DELETE_USER_FAIL' as const;

export const deleteUnitAsync = createAsyncAction(
    DELETE_UNIT_REQUEST,
    DELETE_UNIT_SUCCESS,
    DELETE_UNIT_FAIL,
)<number, AdminState, AdminState>();

export const deleteUserAsync = createAsyncAction(
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
)<number, AdminState, AdminState>();

export const setPageStateAction = createAction(
    SET_PAGE_STATE,
)<string>();

export const UPDATE_USER_ROLE_REQUEST =
  'ADMIN/UPDATE_USER_ROLE_REQUEST' as const;

export const UPDATE_USER_ROLE_SUCCESS =
  'ADMIN/UPDATE_USER_ROLE_SUCCESS' as const;

export const UPDATE_USER_ROLE_FAIL=
  'ADMIN/UPDATE_USER_ROLE_FAIL' as const;

export interface updateUserRoleInterface{
  id: number;
  roleId: number;
}

export const updateUserRoleAsync = createAsyncAction(
    UPDATE_USER_ROLE_REQUEST,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
)<updateUserRoleInterface, AdminState, AdminState>();
