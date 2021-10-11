import {createAsyncAction} from 'typesafe-actions';
import {
  GetScheduleListRes,
  CreateScheduleReq,
  CreateScheduleRes,
  UpdateScheduleReq,
  UpdateScheduleRes,
  DeleteScheduleRes,
  DeleteScheduleReq,
  ErrorRes,
} from './types';

/* Get Schedule List */
export const GET_SCHEDULE_LIST_REQUEST =
  'SCHEDULE/GET_SCHEDULE_LIST_REQUEST' as const;
export const GET_SCHEDULE_LIST_SUCCESS =
  'SCHEDULE/GET_SCHEDULE_LIST_SUCCESS' as const;
export const GET_SCHEDULE_LIST_ERROR =
  'SCHEDULE/GET_SCHEDULE_LIST_ERROR' as const;

export const getScheduleListAsync = createAsyncAction(
    GET_SCHEDULE_LIST_REQUEST,
    GET_SCHEDULE_LIST_SUCCESS,
    GET_SCHEDULE_LIST_ERROR,
)<undefined, GetScheduleListRes, ErrorRes>();

/* Get Schedule List */
export const GET_UNIT_SCHEDULE_LIST_REQUEST =
  'SCHEDULE/GET_UNIT_SCHEDULE_LIST_REQUEST' as const;
export const GET_UNIT_SCHEDULE_LIST_SUCCESS =
  'SCHEDULE/GET_UNIT_SCHEDULE_LIST_SUCCESS' as const;
export const GET_UNIT_SCHEDULE_LIST_ERROR =
  'SCHEDULE/GET_UNIT_SCHEDULE_LIST_ERROR' as const;

export const getUnitScheduleListAsync = createAsyncAction(
    GET_UNIT_SCHEDULE_LIST_REQUEST,
    GET_UNIT_SCHEDULE_LIST_SUCCESS,
    GET_UNIT_SCHEDULE_LIST_ERROR,
)<undefined, GetScheduleListRes, ErrorRes>();

/* Create Schedule List */
export const CREATE_SCHEDULE_REQUEST =
  'SCHEDULE/CREATE_SCHEDULE_REQUEST' as const;
export const CREATE_SCHEDULE_SUCCESS =
  'SCHEDULE/CREATE_SCHEDULE_SUCCESS' as const;
export const CREATE_SCHEDULE_ERROR =
  'SCHEDULE/CREATE_SCHEDULE_ERROR' as const;

export const createScheduleAsync = createAsyncAction(
    CREATE_SCHEDULE_REQUEST,
    CREATE_SCHEDULE_SUCCESS,
    CREATE_SCHEDULE_ERROR,
)<CreateScheduleReq, CreateScheduleRes, ErrorRes>();

/* Update Schedule List */
export const UPDATE_SCHEDULE_REQUEST =
  'SCHEDULE/UPDATE_SCHEDULE_REQUEST' as const;
export const UPDATE_SCHEDULE_SUCCESS =
  'SCHEDULE/UPDATE_SCHEDULE_SUCCESS' as const;
export const UPDATE_SCHEDULE_ERROR =
  'SCHEDULE/UPDATE_SCHEDULE_ERROR' as const;

export const updateScheduleAsync = createAsyncAction(
    UPDATE_SCHEDULE_REQUEST,
    UPDATE_SCHEDULE_SUCCESS,
    UPDATE_SCHEDULE_ERROR,
)<UpdateScheduleReq, UpdateScheduleRes, ErrorRes>();

/* Delete Schedule List */
export const DELETE_SCHEDULE_REQUEST =
  'SCHEDULE/DELETE_SCHEDULE_REQUEST' as const;
export const DELETE_SCHEDULE_SUCCESS =
  'SCHEDULE/DELETE_SCHEDULE_SUCCESS' as const;
export const DELETE_SCHEDULE_ERROR =
  'SCHEDULE/DELETE_SCHEDULE_ERROR' as const;

export const deleteScheduleAsync = createAsyncAction(
    DELETE_SCHEDULE_REQUEST,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_ERROR,
)<DeleteScheduleReq, DeleteScheduleRes, ErrorRes>();
