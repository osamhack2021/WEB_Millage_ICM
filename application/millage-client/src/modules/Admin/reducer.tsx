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
} from './actions';

const initialState: AdminState = {
  result: '',
  role: undefined,
  users: [],
  page: 'users',
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
    users: action.payload.users,
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
});

export default UserReducer;
