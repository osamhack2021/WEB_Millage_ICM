import {createReducer} from 'typesafe-actions';

import {BoardAction, BoardState} from './types';
import {
  GET_BOARD_BY_ID,
  GET_BOARD_BY_ID_SUCCESS,
  GET_BOARD_LIST,
  GET_BOARD_LIST_SUCCESS,
} from './actions';

const initialState: BoardState = {
  boardList: [],
  curBoard: undefined,
};

// createReducer는 reducer를 쉽게 작성할 수 있도록 하는 모듈이며
// 타입 오류를 방지 할 수 있습니다.
const BoardReducer = createReducer<BoardState, BoardAction>(initialState, {
  [GET_BOARD_LIST]: (state) => ({
    ...state,
  }),
  [GET_BOARD_LIST_SUCCESS]: (state, action) => ({
    ...state,
    boardList: action.payload.boardList,
  }),
  [GET_BOARD_BY_ID]: (state) => ({
    ...state,
  }),
  [GET_BOARD_BY_ID_SUCCESS]: (state, action) => {
    if (action.payload.ok) {
      return {
        ...state,
        curBoard: action.payload.board,
      };
    }
    return {...state};
  },
});

export default BoardReducer;
