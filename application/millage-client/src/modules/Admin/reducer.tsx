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
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  GET_BOARDLIST_REQUEST,
  GET_BOARDLIST_SUCCESS,
  GET_BOARDLIST_FAIL,
  UPDATE_BOARD_REQUEST,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAIL,
  INSERT_BOARD_REQUEST,
  INSERT_BOARD_SUCCESS,
  INSERT_BOARD_FAIL,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAIL,
  DELETE_PLACE_FAIL,
  DELETE_PLACE_REQUEST,
  DELETE_PLACE_SUCCESS,
  GET_PLACELIST_FAIL,
  GET_PLACELIST_REQUEST,
  GET_PLACELIST_SUCCESS,
  INSERT_PLACE_FAIL,
  INSERT_PLACE_REQUEST,
  INSERT_PLACE_SUCCESS,
  UPDATE_PLACE_FAIL,
  UPDATE_PLACE_REQUEST,
  UPDATE_PLACE_SUCCESS,
} from './actions';

const initialState: AdminState = {
  result: '',
  role: undefined,
  users: [],
  page: 'users',
  units: [],
  boards: [],
  places: [],
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
    result: '',
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
  [UPDATE_USER_ROLE_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [UPDATE_USER_ROLE_SUCCESS]: (state, action) => ({
    ...state,
    result: 'updateUserRoleSuccess',
  }),
  [UPDATE_USER_ROLE_FAIL]: (state, action) => ({
    ...state,
    result: 'updateUserRoleFail',
  }),
  [GET_BOARDLIST_REQUEST]: (state, action) => ({
    ...state,
  }),
  [GET_BOARDLIST_SUCCESS]: (state, action) => ({
    ...state,
    boards: action.payload.boards,
  }),
  [GET_BOARDLIST_FAIL]: (state, action) => ({
    ...state,
  }),
  [UPDATE_BOARD_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [UPDATE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    result: 'updateBoardSuccess',
  }),
  [UPDATE_BOARD_FAIL]: (state, action) => ({
    ...state,
    result: 'updateBoardFail',
  }),
  [INSERT_BOARD_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [INSERT_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    result: 'insertBoardSuccess',
  }),
  [INSERT_BOARD_FAIL]: (state, action) => ({
    ...state,
    result: 'insertBoardFail',
  }),
  [DELETE_BOARD_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [DELETE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    result: 'deleteBoardSuccess',
  }),
  [DELETE_BOARD_FAIL]: (state, action) => ({
    ...state,
    result: 'deleteBoardFail',
  }),
  [GET_PLACELIST_REQUEST]: (state, action) => ({
    ...state,
  }),
  [GET_PLACELIST_SUCCESS]: (state, action) => ({
    ...state,
    places: action.payload.places,
  }),
  [GET_PLACELIST_FAIL]: (state, action) => ({
    ...state,
  }),
  [UPDATE_PLACE_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [UPDATE_PLACE_SUCCESS]: (state, action) => ({
    ...state,
    result: 'updatePlaceSuccess',
  }),
  [UPDATE_PLACE_FAIL]: (state, action) => ({
    ...state,
    result: 'updatePlaceFail',
  }),
  [INSERT_PLACE_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [INSERT_PLACE_SUCCESS]: (state, action) => ({
    ...state,
    result: 'insertPlaceSuccess',
  }),
  [INSERT_PLACE_FAIL]: (state, action) => ({
    ...state,
    result: 'insertPlaceFail',
  }),
  [DELETE_PLACE_REQUEST]: (state, action) => ({
    ...state,
    result: '',
  }),
  [DELETE_PLACE_SUCCESS]: (state, action) => ({
    ...state,
    result: 'deletePlaceSuccess',
  }),
  [DELETE_PLACE_FAIL]: (state, action) => ({
    ...state,
    result: 'deletePlaceFail',
  }),
});

export default UserReducer;
