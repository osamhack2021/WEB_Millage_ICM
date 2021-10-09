import {createReducer} from 'typesafe-actions';
import {AdminAction, AdminState} from './types';
import {
  GET_USERLIST_REQUEST,
  GET_USERLIST_SUCCESS,
  GET_USERLIST_FAIL,
} from './actions';

const initialState: AdminState = {
  result: '',
  role: undefined,
  users: [],
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

});

export default UserReducer;
