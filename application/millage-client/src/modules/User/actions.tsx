import {createAction, createAsyncAction} from 'typesafe-actions';
import {UserSubmitData, UserState,
  UserLoginData, UserValidateData, UserUpdateData} from './types';

export const CREATE_USER_REQUEST =
  'USER/CREATE_USER_REQUEST' as const;

export const CREATE_USER_SUCCESS =
  'USER/CREATE_USER_SUCCESS' as const;

export const CREATE_USER_FAIL =
  'USER/CREATE_USER_FAIL' as const;

export const UPDATE_USER_REQUEST =
  'USER/UPDATE_USER_REQUEST' as const;

export const UPDATE_USER_SUCCESS =
  'USER/UPDATE_USER_SUCCESS' as const;

export const UPDATE_USER_FAIL =
  'USER/UPDATE_USER_FAIL' as const;


export const LOGIN_USER_REQUEST =
  'USER/LOGIN_USER_REQUEST' as const;

export const LOGIN_USER_SUCCESS =
  'USER/LOGIN_USER_SUCCESS' as const;

export const LOGIN_USER_FAIL =
  'USER/LOGIN_USER_FAIL' as const;

export const CHECK_SESSION_REQUEST =
'USER/CHECK_SESSION_REQUEST' as const;

export const CHECK_SESSION_SUCCESS =
'USER/CHECK_SESSION_SUCCESS' as const;

export const CHECK_SESSION_FAIL =
'USER/CHECK_SESSION_FAIL' as const;

export const UPDATE_UNREAD_REQUEST =
'USER/UPDATE_UNREAD_REQUEST' as const;

export const UPDATE_UNREAD_SUCCESS =
'USER/UPDATE_UNREAD_SUCCESS' as const;

export const UPDATE_UNREAD_FAIL =
'USER/UPDATE_UNREAD_FAIL' as const;

export const VALIDATE_USER_REQUEST =
'USER/VALIDATE_USER_REQUEST' as const;

export const VALIDATE_USER_SUCCESS =
'USER/VALIDATE_USER_SUCCESS' as const;

export const VALIDATE_USER_FAIL =
'USER/VALIDATE_USER_FAIL' as const;

export const LOGOUT_REQUEST =
'USER/LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS =
'USER/LOGOUT_SUCCESS' as const;
export const LOGOUT_FAIL =
'USER/LOGOUT_FAIL' as const;

export const logoutAsync = createAsyncAction(
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
)<undefined, UserState>();

export const createUserAsync = createAsyncAction(
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
)<UserSubmitData, UserState, UserState>();

export const updateUserAsync = createAsyncAction(
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
)<UserUpdateData, UserState, UserState>();

export const loginAsync = createAsyncAction(
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
)<UserLoginData, UserState, UserState>();


export const checkSessionAsync = createAsyncAction(
    CHECK_SESSION_REQUEST,
    CHECK_SESSION_SUCCESS,
    CHECK_SESSION_FAIL,
)<undefined, UserState, UserState>();


export const updateUnreadAsync = createAsyncAction(
    UPDATE_UNREAD_REQUEST,
    UPDATE_UNREAD_SUCCESS,
    UPDATE_UNREAD_FAIL,
)<undefined, UserState, UserState>();

export const validateUserAsync = createAsyncAction(
    VALIDATE_USER_REQUEST,
    VALIDATE_USER_SUCCESS,
    VALIDATE_USER_FAIL,
)<UserValidateData, UserState, UserState>();
