import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export interface Reservation {
  id: number;
  title: string;
  total?: number;
  start: Date;
  end: Date;
  bookerId?: number;
  unitId?: number;
  placeId: number;
}

export interface Place {
  id: number;
  name: string;
  seats: number;
  unitId: number;
  description: string;
  reservations: Array<Reservation>;
}

export interface GetPlaceListRes {
  result: string;
  places: Array<Place>;
}

export interface GetPlaceByIdReq {
  id: string;
}

export interface GetPlaceByIdRes {
  result: string;
  place: Place;
}

export interface CreatePlaceReq {
  name: string;
  seats: number;
}

export interface CreatePlaceRes {
  place: Place;
  result: string;
}

export interface UpdatePlaceReq extends CreatePlaceReq {
  id: string;
}
export interface UpdatePlaceRes extends CreatePlaceRes {}

export interface DeletePlaceReq {
  id: string;
}
export interface DeletePlaceRes {
  result: string;
  deletedId: number;
}

export interface CreateReservationReq {
  title: string;
  start: Date;
  end: Date;
  placeId: number;
}

export interface CreateReservationRes {
  reservation: Reservation;
  result: string;
}

export interface DeleteReservationReq {
  id: string;
}
export interface DeleteReservationRes {
  result: string;
  deletedId: number;
}

export interface ErrorRes {
  result: string;
  message?: string;
}

export interface ReservationState extends Omit<
  Reservation,
  'id' | 'placeId'
> {
  id: string;
  groupId: string;
}

export interface PlaceState extends Omit<Place, 'reservations'>{
  reservations: Array<ReservationState>
}

export interface ReducerState{
  result: string;
  message?: string;
  place: PlaceState;
  places: Array<Place>;
}

export type PlaceAction = ActionType<typeof actions>;
