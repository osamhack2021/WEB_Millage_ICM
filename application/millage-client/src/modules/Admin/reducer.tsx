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
    result: 'confirmsuccess',
  }),
  [AUTH_USER_FAIL]: (state, action) => ({
    ...state,
    result: 'confirmfail',
  }),
  [AUTH_UNIT_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [AUTH_UNIT_SUCCESS]: (state, action) => ({
    ...state,
    result: 'unitconfirmsuccess',
  }),
  [AUTH_UNIT_FAIL]: (state, action) => ({
    ...state,
    result: 'unitconfirmfail',
  }),
});

export default UserReducer;
