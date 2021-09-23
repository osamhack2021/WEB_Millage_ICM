import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {DMState} from './types';


export const GET_MESSAGEBOX_LIST =
  'DM/GET_MESSAGEBOX_LIST' as const;

export const GET_MESSAGEBOX_LIST_SUCCESS =
  'DM/GET_MESSAGEBOX_LIST_SUCCESS' as const;

export const GET_MESSAGEBOX_LIST_ERROR =
  'DM/GET_MESSAGEBOX_LIST_ERROR' as const;

export const getMessageBoxListAsync = createAsyncAction(
    GET_MESSAGEBOX_LIST,
    GET_MESSAGEBOX_LIST_SUCCESS,
    GET_MESSAGEBOX_LIST_ERROR,
)<undefined, DMState, AxiosError>();
