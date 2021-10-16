import {createAsyncAction} from 'typesafe-actions';
import {
  GetPlaceListRes,
  GetPlaceByIdReq,
  GetPlaceByIdRes,
  CreatePlaceReq,
  CreatePlaceRes,
  UpdatePlaceReq,
  UpdatePlaceRes,
  DeletePlaceReq,
  DeletePlaceRes,
  CreateReservationReq,
  CreateReservationRes,
  DeleteReservationReq,
  DeleteReservationRes,
  ErrorRes,
} from './types';

/* Get Place List */
export const GET_PLACE_LIST_REQUEST =
  'PLACE/GET_PLACE_LIST_REQUEST' as const;
export const GET_PLACE_LIST_SUCCESS =
  'PLACE/GET_PLACE_LIST_SUCCESS' as const;
export const GET_PLACE_LIST_ERROR =
  'PLACE/GET_PLACE_LIST_ERROR' as const;

export const getPlaceListAsync = createAsyncAction(
    GET_PLACE_LIST_REQUEST,
    GET_PLACE_LIST_SUCCESS,
    GET_PLACE_LIST_ERROR,
)<undefined, GetPlaceListRes, ErrorRes>();

/* Get Place By Id List */
export const GET_PLACE_BY_ID_REQUEST =
  'PLACE/GET_PLACE_REQUEST' as const;
export const GET_PLACE_BY_ID_SUCCESS =
  'PLACE/GET_PLACE_SUCCESS' as const;
export const GET_PLACE_BY_ID_ERROR =
  'PLACE/GET_PLACE_ERROR' as const;

export const getPlaceByIdAsync = createAsyncAction(
    GET_PLACE_BY_ID_REQUEST,
    GET_PLACE_BY_ID_SUCCESS,
    GET_PLACE_BY_ID_ERROR,
)<GetPlaceByIdReq, GetPlaceByIdRes, ErrorRes>();

/* Create Place List */
export const CREATE_PLACE_REQUEST =
  'PLACE/CREATE_PLACE_REQUEST' as const;
export const CREATE_PLACE_SUCCESS =
  'PLACE/CREATE_PLACE_SUCCESS' as const;
export const CREATE_PLACE_ERROR =
  'PLACE/CREATE_PLACE_ERROR' as const;

export const createPlaceAsync = createAsyncAction(
    CREATE_PLACE_REQUEST,
    CREATE_PLACE_SUCCESS,
    CREATE_PLACE_ERROR,
)<CreatePlaceReq, CreatePlaceRes, ErrorRes>();

/* Update Place List */
export const UPDATE_PLACE_REQUEST =
  'PLACE/UPDATE_PLACE_REQUEST' as const;
export const UPDATE_PLACE_SUCCESS =
  'PLACE/UPDATE_PLACE_SUCCESS' as const;
export const UPDATE_PLACE_ERROR =
  'PLACE/UPDATE_PLACE_ERROR' as const;

export const updatePlaceAsync = createAsyncAction(
    UPDATE_PLACE_REQUEST,
    UPDATE_PLACE_SUCCESS,
    UPDATE_PLACE_ERROR,
)<UpdatePlaceReq, UpdatePlaceRes, ErrorRes>();

/* Delete Place List */
export const DELETE_PLACE_REQUEST =
  'PLACE/DELETE_PLACE_REQUEST' as const;
export const DELETE_PLACE_SUCCESS =
  'PLACE/DELETE_PLACE_SUCCESS' as const;
export const DELETE_PLACE_ERROR =
  'PLACE/DELETE_PLACE_ERROR' as const;

export const deletePlaceAsync = createAsyncAction(
    DELETE_PLACE_REQUEST,
    DELETE_PLACE_SUCCESS,
    DELETE_PLACE_ERROR,
)<DeletePlaceReq, DeletePlaceRes, ErrorRes>();

/* Create Reservation List */
export const CREATE_RESERVATION_REQUEST =
  'RESERVATION/CREATE_RESERVATION_REQUEST' as const;
export const CREATE_RESERVATION_SUCCESS =
  'RESERVATION/CREATE_RESERVATION_SUCCESS' as const;
export const CREATE_RESERVATION_ERROR =
  'RESERVATION/CREATE_RESERVATION_ERROR' as const;

export const createReservationAsync = createAsyncAction(
    CREATE_RESERVATION_REQUEST,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_ERROR,
)<CreateReservationReq, CreateReservationRes, ErrorRes>();

/* Delete Reservation List */
export const DELETE_RESERVATION_REQUEST =
  'RESERVATION/DELETE_RESERVATION_REQUEST' as const;
export const DELETE_RESERVATION_SUCCESS =
  'RESERVATION/DELETE_RESERVATION_SUCCESS' as const;
export const DELETE_RESERVATION_ERROR =
  'RESERVATION/DELETE_RESERVATION_ERROR' as const;

export const deleteReservationAsync = createAsyncAction(
    DELETE_RESERVATION_REQUEST,
    DELETE_RESERVATION_SUCCESS,
    DELETE_RESERVATION_ERROR,
)<DeleteReservationReq, DeleteReservationRes, ErrorRes>();
