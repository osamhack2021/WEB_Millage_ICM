import {createAction, createAsyncAction} from 'typesafe-actions';
import {DMState} from './types';

export const GET_MESSAGEBOX_LIST =
  'DM/GET_MESSAGEBOX_LIST' as const;

export const GET_MESSAGEBOX_LIST_SUCCESS =
  'DM/GET_MESSAGEBOX_LIST_SUCCESS' as const;

export const GET_MESSAGEBOX_LIST_FAIL =
  'DM/GET_MESSAGEBOX_LIST_FAIL' as const;

export const GET_MESSAGES_REQUEST =
  'DM/GET_MESSAGES_REQUEST' as const;

export const GET_MESSAGES_SUCCESS =
  'DM/GET_MESSAGES_SUCCESS' as const;

export const GET_MESSAGES_FAIL =
  'DM/GET_MESSAGES_FAIL' as const;

export const SET_MESSAGES_AS_READ =
  'DM/SET_MESSAGES_AS_READ' as const;

export const setMessagesAsRead = createAction(SET_MESSAGES_AS_READ)<number>();

export const getMessageBoxListAsync = createAsyncAction(
    GET_MESSAGEBOX_LIST,
    GET_MESSAGEBOX_LIST_SUCCESS,
    GET_MESSAGEBOX_LIST_FAIL,
)<undefined, DMState, DMState>();


export const getMessagesAsync = createAsyncAction(
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
)<number, DMState, DMState>();
