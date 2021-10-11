import {createReducer} from 'typesafe-actions';
import {BoardAction, BoardState} from './types';
import {
  GET_BOARD_BY_ID,
  GET_BOARD_BY_ID_FAILURE,
  GET_BOARD_BY_ID_SUCCESS,
  GET_BOARD_LIST,
  GET_BOARD_LIST_ERROR,
  GET_BOARD_LIST_SUCCESS,
  GET_POST,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,
  TOGGLE_POST_HEART,
} from './actions';

const initialState: BoardState = {
  boardListState: {
    loading: false,
    data: null,
    error: null,
  },
  curBoardState: {
    loading: false,
    data: null,
    error: null,
  },
  postState: {
    loading: false,
    data: null,
    error: null,
  },
};

const BoardReducer = createReducer<BoardState, BoardAction>(initialState, {
  [GET_BOARD_LIST]: (state) => ({
    ...state,
    boardListState: {
      ...state.boardListState,
      loading: true,
    },
  }),
  [GET_BOARD_LIST_SUCCESS]: (state, action) => ({
    ...state,
    boardListState: {
      loading: false,
      data: action.payload.boards,
      error: null,
    },
  }),
  [GET_BOARD_LIST_ERROR]: (state, action) => ({
    ...state,
    boardListState: {
      loading: false,
      data: null,
      error: action.payload,
    },
  }),

  [GET_BOARD_BY_ID]: (state) => ({
    ...state,
    curBoardState: {
      ...state.curBoardState,
      loading: true,
    },
  }),
  [GET_BOARD_BY_ID_SUCCESS]: (state, action) => {
    if (action.payload.result === 'success' && action.payload.board) {
      return {
        ...state,
        curBoardState: {
          loading: false,
          data: action.payload.board,
          error: null,
        },
      };
    }
    return {
      ...state,
      curBoardState: {
        loading: false,
        data: null,
        error: action.payload.message,
      },
    };
  },
  [GET_BOARD_BY_ID_FAILURE]: (state, action) => ({
    ...state,
    curBoardState: {
      loading: false,
      data: null,
      error: action.payload,
    },
  }),

  [GET_POST]: (state) => ({
    ...state,
    postState: {
      ...state.postState,
      loading: true,
    },
  }),
  [GET_POST_SUCCESS]: (state, action) => {
    if (action.payload.result === 'success' && action.payload.post) {
      const me = action.payload.session;
      const hasHearted: boolean = action.payload.post.hearts ?
        action.payload.post.hearts.every((user) => user.id === me.id) :
        false;

      return {
        ...state,
        curBoardState: {
          ...state.curBoardState,
          data: action.payload.post.board,
        },
        postState: {
          loading: false,
          data: {
            ...action.payload.post,
            hasHearted,
          },
          error: null,
        },
      };
    }
    return {
      ...state,
      postState: {
        loading: false,
        data: null,
        error: action.payload.message,
      },
    };
  },
  [GET_POST_FAILURE]: (state, action) => ({
    ...state,
    postState: {
      loading: false,
      data: null,
      error: action.payload.message,
    },
  }),

  [TOGGLE_POST_HEART]: (state) => {
    if (!state.postState.data) {
      return {...state};
    }

    const {hasHearted, heartCount} = state.postState.data;
    return {
      ...state,
      postState: {
        ...state.postState,
        data: {
          ...state.postState.data,
          hasHearted: !hasHearted,
          heartCount: hasHearted ?
            heartCount - 1 :
            heartCount + 1,
        },
      },
    };
  },
});

export default BoardReducer;
