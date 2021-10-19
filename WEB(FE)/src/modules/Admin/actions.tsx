import {createAction, createAsyncAction} from 'typesafe-actions';
import {
  AdminState,
  BoardInsertData,
  BoardUpdateData,
  PlaceInsertData,
  PlaceUpdateData,
} from './types';

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

export const GET_BOARDLIST_REQUEST =
  'ADMIN/GET_BOARDLIST_REQUEST';

export const GET_BOARDLIST_SUCCESS =
  'ADMIN/GET_BOARDLIST_SUCCESS';

export const GET_BOARDLIST_FAIL=
  'ADMIN/GET_BOARDLIST_FAIL';

export const getBoardListAsync = createAsyncAction(
    GET_BOARDLIST_REQUEST,
    GET_BOARDLIST_SUCCESS,
    GET_BOARDLIST_FAIL,
)<undefined, AdminState, AdminState>();

export const UPDATE_BOARD_REQUEST =
  'ADMIN/UPDATE_BOARD_REQUEST';

export const UPDATE_BOARD_SUCCESS =
  'ADMIN/UPDATE_BOARD_SUCCESS';

export const UPDATE_BOARD_FAIL=
  'ADMIN/UPDATE_BOARD_FAIL';

export const updateBoardAsync = createAsyncAction(
    UPDATE_BOARD_REQUEST,
    UPDATE_BOARD_SUCCESS,
    UPDATE_BOARD_FAIL,
)<BoardUpdateData, AdminState, AdminState>();

export const INSERT_BOARD_REQUEST =
  'ADMIN/INSERT_BOARD_REQUEST';

export const INSERT_BOARD_SUCCESS =
  'ADMIN/INSERT_BOARD_SUCCESS';

export const INSERT_BOARD_FAIL=
  'ADMIN/INSERT_BOARD_FAIL';

export const insertBoardAsync = createAsyncAction(
    INSERT_BOARD_REQUEST,
    INSERT_BOARD_SUCCESS,
    INSERT_BOARD_FAIL,
)<BoardInsertData, AdminState, AdminState>();

export const DELETE_BOARD_REQUEST =
  'ADMIN/DELETE_BOARD_REQUEST';

export const DELETE_BOARD_SUCCESS =
  'ADMIN/DELETE_BOARD_SUCCESS';

export const DELETE_BOARD_FAIL=
  'ADMIN/DELETE_BOARD_FAIL';

export const deleteBoardAsync = createAsyncAction(
    DELETE_BOARD_REQUEST,
    DELETE_BOARD_SUCCESS,
    DELETE_BOARD_FAIL,
)<number, AdminState, AdminState>();

export const GET_PLACELIST_REQUEST =
  'ADMIN/GET_PLACELIST_REQUEST';

export const GET_PLACELIST_SUCCESS =
  'ADMIN/GET_PLACELIST_SUCCESS';

export const GET_PLACELIST_FAIL=
  'ADMIN/GET_PLACELIST_FAIL';

export const getPlaceListAsync = createAsyncAction(
    GET_PLACELIST_REQUEST,
    GET_PLACELIST_SUCCESS,
    GET_PLACELIST_FAIL,
)<undefined, AdminState, AdminState>();

export const UPDATE_PLACE_REQUEST =
  'ADMIN/UPDATE_PLACE_REQUEST';

export const UPDATE_PLACE_SUCCESS =
  'ADMIN/UPDATE_PLACE_SUCCESS';

export const UPDATE_PLACE_FAIL=
  'ADMIN/UPDATE_PLACE_FAIL';

export const updatePlaceAsync = createAsyncAction(
    UPDATE_PLACE_REQUEST,
    UPDATE_PLACE_SUCCESS,
    UPDATE_PLACE_FAIL,
)<PlaceUpdateData, AdminState, AdminState>();

export const INSERT_PLACE_REQUEST =
  'ADMIN/INSERT_PLACE_REQUEST';

export const INSERT_PLACE_SUCCESS =
  'ADMIN/INSERT_PLACE_SUCCESS';

export const INSERT_PLACE_FAIL=
  'ADMIN/INSERT_PLACE_FAIL';

export const insertPlaceAsync = createAsyncAction(
    INSERT_PLACE_REQUEST,
    INSERT_PLACE_SUCCESS,
    INSERT_PLACE_FAIL,
)<PlaceInsertData, AdminState, AdminState>();

export const DELETE_PLACE_REQUEST =
  'ADMIN/DELETE_PLACE_REQUEST';

export const DELETE_PLACE_SUCCESS =
  'ADMIN/DELETE_PLACE_SUCCESS';

export const DELETE_PLACE_FAIL=
  'ADMIN/DELETE_PLACE_FAIL';

export const deletePlaceAsync = createAsyncAction(
    DELETE_PLACE_REQUEST,
    DELETE_PLACE_SUCCESS,
    DELETE_PLACE_FAIL,
)<number, AdminState, AdminState>();
