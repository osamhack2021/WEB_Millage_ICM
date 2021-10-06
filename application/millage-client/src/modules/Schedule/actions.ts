import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {Schedules} from './types';

export const GET_SCHEDULE_LIST =
  'SCHEDULE/GET_SCHEDULE_LIST' as const;

export const GET_SCHEDULE_LIST_SUCCESS =
  'SCHEDULE/GET_SCHEDULE_LIST_SUCCESS' as const;

export const GET_SCHEDULE_LIST_ERROR =
  'SCHEDULE/GET_SCHEDULE_LIST_ERROR' as const;

export const getScheduleListAsync = createAsyncAction(
    GET_SCHEDULE_LIST,
    GET_SCHEDULE_LIST_SUCCESS,
    GET_SCHEDULE_LIST_ERROR,
)<undefined, Schedules, AxiosError>();
