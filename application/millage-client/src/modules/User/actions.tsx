import {createAsyncAction} from 'typesafe-actions';
import {UserSubmitData, UserState} from './types';

export const CREATE_USER_REQUEST =
  'USER/CREATE_USER_REQUEST' as const;

export const CREATE_USER_SUCCESS =
  'USER/CREATE_USER_SUCCESS' as const;

export const CREATE_USER_FAIL =
  'USER/CREATE_USER_FAIL' as const;


export const createUserAsync = createAsyncAction(
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
)<UserSubmitData, UserState, UserState>();
