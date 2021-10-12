import {createReducer} from 'typesafe-actions';
import {AdminAction, AdminState} from './types';
import {
  GET_USERLIST_REQUEST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAIL,
  SET_PAGE_STATE,
  AUTH_USER_SUCCESS,
  AUTH_USER_REQUEST,
  AUTH_USER_FAIL,
  GET_UNITLIST_REQUEST,
  GET_UNITLIST_SUCCESS,
  GET_UNITLIST_FAIL,
  AUTH_UNIT_SUCCESS,
  AUTH_UNIT_REQUEST,
  AUTH_UNIT_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAIL,
} from './actions';

const initialState: AdminState = {
  result: '',
  role: undefined,
  users: [],
  page: 'users',
  units: [],
};

const UserReducer = createReducer<AdminState, AdminAction>(initialState, {
  [GET_USERLIST_REQUEST]: (state, action) => (
    initialState
  ),
  [GET_USERLIST_SUCCESS]: (state, action) => ({
    ...state,
    users: action.payload.users,
  }),
  [GET_USERLIST_FAIL]: (state, action) => ({
    ...state,
  }),
  [GET_UNITLIST_REQUEST]: (state, action) => ({
    ...state,
  }),
  [GET_UNITLIST_SUCCESS]: (state, action) => ({
    ...state,
    units: action.payload.units,
  }),
  [GET_UNITLIST_FAIL]: (state, action) => ({
    ...state,
  }),
  [SET_PAGE_STATE]: (state, action) => ({
    ...state,
    page: action.payload,
  }),
  [AUTH_USER_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [AUTH_USER_SUCCESS]: (state, action) => ({
    ...state,
    result: 'confirmUserSuccess',
  }),
  [AUTH_USER_FAIL]: (state, action) => ({
    ...state,
    result: 'confirmUserFail',
  }),
  [AUTH_UNIT_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [AUTH_UNIT_SUCCESS]: (state, action) => ({
    ...state,
    result: 'confirmUnitSuccess',
  }),
  [AUTH_UNIT_FAIL]: (state, action) => ({
    ...state,
    result: 'confirmUnitFail',
  }),
  [DELETE_USER_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [DELETE_USER_SUCCESS]: (state, action) => ({
    ...state,
    result: 'deleteUserSuccess',
  }),
  [DELETE_USER_FAIL]: (state, action) => ({
    ...state,
    result: 'deleteUserFail',
  }),
  [DELETE_UNIT_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [DELETE_UNIT_SUCCESS]: (state, action) => ({
    ...state,
    result: 'deleteUnitSuccess',
  }),
  [DELETE_UNIT_FAIL]: (state, action) => ({
    ...state,
    result: 'deleteUnitFail',
  }),
});

export default UserReducer;
