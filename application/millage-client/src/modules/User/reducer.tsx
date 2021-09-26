import {createReducer} from 'typesafe-actions';
import {UserAction, UserState} from './types';
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from './actions';

const initialState: UserState = {
  result: '',
};

// createReducer는 reducer를 쉽게 작성할 수 있도록 하는 모듈이며
// 타입 오류를 방지 할 수 있습니다.
const DMReducer = createReducer<UserState, UserAction>(initialState, {
  [CREATE_USER_REQUEST]: (state, action) => ({
    ...state,
  }),
  [CREATE_USER_SUCCESS]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
  [CREATE_USER_FAIL]: (state, action) => ({
    ...state,
    result: action.payload.result,
  }),
});

export default DMReducer;
