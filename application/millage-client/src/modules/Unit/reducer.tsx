import {createReducer} from 'typesafe-actions';
import {UnitState, UnitAction} from './types';
import {
  GET_UNIT_LIST_REQUEST,
  GET_UNIT_LIST_SUCCESS,
  GET_UNIT_LIST_FAIL,
} from './actions';

const initialState: UnitState = {
  result: '',
  message: '',
  units: [],
};

const UnitReducer = createReducer<UnitState, UnitAction>(initialState, {
  [GET_UNIT_LIST_REQUEST]: (state, action) => ({
    ...state,
  }),
  [GET_UNIT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    result: action.payload.result,
    units: action.payload.units,
  }),
  [GET_UNIT_LIST_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
    message: action.payload.message,
  }),
});

export default UnitReducer;
