import {createReducer} from 'typesafe-actions';

import {DMAction, DMState} from './types';
import {GET_MESSAGEBOX_LIST, GET_MESSAGEBOX_LIST_SUCCESS} from './actions';

const initialState: DMState = {
  result: '',
  message: '',
  messageboxes: [],
};

// createReducer는 reducer를 쉽게 작성할 수 있도록 하는 모듈이며
// 타입 오류를 방지 할 수 있습니다.
const DMReducer = createReducer<DMState, DMAction>(initialState, {
  [GET_MESSAGEBOX_LIST]: (state, action) => ({
    ...state,
  }),
  [GET_MESSAGEBOX_LIST_SUCCESS]: (state, action) => ({
    ...state,
    messageboxes: action.payload.messageboxes,
  }),
});

export default DMReducer;
