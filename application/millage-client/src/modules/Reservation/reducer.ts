import {createReducer} from 'typesafe-actions';
import {
  Place,
  PlaceAction,
  PlaceState,
  ReducerState,
  Reservation,
  ReservationState,
} from './types';
import {
  GET_PLACE_LIST_REQUEST,
  GET_PLACE_LIST_SUCCESS,
  GET_PLACE_LIST_ERROR,
  GET_PLACE_BY_ID_REQUEST,
  GET_PLACE_BY_ID_SUCCESS,
  GET_PLACE_BY_ID_ERROR,
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_ERROR,
  UPDATE_PLACE_REQUEST,
  UPDATE_PLACE_SUCCESS,
  UPDATE_PLACE_ERROR,
  DELETE_PLACE_REQUEST,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_ERROR,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_ERROR,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_ERROR,
} from './actions';

const initialState: ReducerState = {
  place: {
    id: 0,
    name: '',
    seats: 0,
    unitId: 0,
    reservations: [],
  },
  places: [],
  result: '',
  message: '',
};

const convertReservationResToState = ({id, placeId, ...props}: Reservation) => {
  const result: ReservationState = {
    ...props,
    id: id.toString(),
    groupId: placeId.toString(),
  };
  return result;
};

const convertPlaceResToState = ({reservations, ...props}: Place) => {
  const result: PlaceState = {
    ...props,
    reservations: reservations.map<ReservationState>((
        reservation,
    ) => convertReservationResToState(reservation)),
  };
  return result;
};

const ReservationReducer = createReducer<ReducerState, PlaceAction>(
    initialState, {
      [GET_PLACE_LIST_REQUEST]: (state, action) => ({
        ...state,
      }),
      [GET_PLACE_LIST_SUCCESS]: (state, action) => ({
        ...state,
        places: action.payload.places,
        result: action.payload.result,
      }),
      [GET_PLACE_LIST_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [GET_PLACE_BY_ID_REQUEST]: (state, action) => ({
        ...state,
      }),
      [GET_PLACE_BY_ID_SUCCESS]: (state, action) => ({
        ...state,
        place: convertPlaceResToState(action.payload.place),
      }),
      [GET_PLACE_BY_ID_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [CREATE_PLACE_REQUEST]: (state, action) => ({
        ...state,
      }),
      [CREATE_PLACE_SUCCESS]: (state, action) => ({
        ...state,
        places: [
          ...state.places.filter(({id}) => id !== action.payload.place.id),
          action.payload.place,
        ],
      }),
      [CREATE_PLACE_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [UPDATE_PLACE_REQUEST]: (state, action) => ({
        ...state,
      }),
      [UPDATE_PLACE_SUCCESS]: (state, action) => ({
        ...state,
        places: [
          ...state.places.filter(({id}) => id !== action.payload.place.id),
          action.payload.place,
        ],
      }),
      [UPDATE_PLACE_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [DELETE_PLACE_REQUEST]: (state, action) => ({
        ...state,
      }),
      [DELETE_PLACE_SUCCESS]: (state, action) => ({
        ...state,
        result: action.payload.result,
        places: state.places.filter(({id}) => id !== action.payload.deletedId),
      }),
      [DELETE_PLACE_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [CREATE_RESERVATION_REQUEST]: (state, action) => ({
        ...state,
      }),
      [CREATE_RESERVATION_SUCCESS]: (state, action) => ({
        ...state,
        place: {
          ...state.place,
          reservations: [
            ...state.place.reservations,
            convertReservationResToState(action.payload.reservation),
          ],
        },
      }),
      [CREATE_RESERVATION_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [DELETE_RESERVATION_REQUEST]: (state, action) => ({
        ...state,
      }),
      [DELETE_RESERVATION_SUCCESS]: (state, action) => ({
        ...state,
        result: action.payload.result,
        place: {
          ...state.place,
          reservations: state.place.reservations.filter((
              {id},
          ) => id !== action.payload.deletedId.toString()),
        },
      }),
      [DELETE_RESERVATION_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
    });

export default ReservationReducer;
