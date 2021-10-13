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
  TOGGLE_RECRUIT_SUCCESS,
  TOGGLE_VOTE,
  GET_RECRUIT_AND_POST_LIST_REQUEST,
  GET_RECRUIT_AND_POST_LIST_SUCCESS,
  GET_RECRUIT_AND_POST_LIST_FAILURE,
  GET_RECENT_SCHEDULE_REQUEST,
  GET_RECENT_SCHEDULE_SUCCESS,
  GET_RECENT_SCHEDULE_FAILURE,
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
  sideboxState: {
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

  [TOGGLE_VOTE]: (state) => {
    if (
      !state.postState.data ||
      state.postState.data.postType !== 'POLL'
    ) {
      return {...state};
    }

    /**
     * API에 따라서 success 시 isvoter, pollist 반환하면 그걸 이용하자
     */
    // const {session, pollId} = action.payload;
    const {isVoter} = state.postState.data;
    // if (!isVoter) {
    //   return {
    //     ...state,
    //     postState: {
    //       ...state.postState,
    //       data: {
    //         ...state.postState.data,
    //         isVoter: true,
    //         pollItems
    //       }
    //     }
    //   }
    // }

    return {
      ...state,
      postState: {
        ...state.postState,
        data: {
          ...state.postState.data,
          // 변경해야 함 (pollItem의 voters에 user가 있는 지 확인)
          isVoter: !isVoter,
        },
      },
    };
  },
  /**
   * Toggle Vote Success에 변경된 pollList를 state에 업데이트 하는 내용 추가
   */

  [TOGGLE_RECRUIT_SUCCESS]: (state, action) => {
    if (action.payload.result !== 'success') {
      return {...state};
    }
    return {
      ...state,
      postState: {
        ...state.postState,
        data: state.postState.data && {
          ...state.postState.data,
          recruitStatus: action.payload.recruitStatus,
        },
      },
    };
  },
  [GET_RECRUIT_AND_POST_LIST_REQUEST]: (state) => ({
    ...state,
    sideboxState: {
      ...state.sideboxState,
      loading: true,
    },
  }),
  [GET_RECRUIT_AND_POST_LIST_SUCCESS]: (state, action) => ({
    ...state,
    sideboxState: {
      loading: false,
      data: {
        ...state.sideboxState.data,
        posts: action.payload.posts,
      },
      error: null,
    },
  }),
  [GET_RECRUIT_AND_POST_LIST_FAILURE]: (state, action) => ({
    ...state,
    sideboxState: {
      loading: false,
      data: null,
      error: action.payload,
    },
  }),
  [GET_RECENT_SCHEDULE_REQUEST]: (state) => ({
    ...state,
    sideboxState: {
      ...state.sideboxState,
      loading: true,
    },
  }),
  [GET_RECENT_SCHEDULE_SUCCESS]: (state, action) => ({
    ...state,
    sideboxState: {
      loading: false,
      data: {
        ...state.sideboxState.data,
        schedules: action.payload.schedules,
      },
      error: null,
    },
  }),
  [GET_RECENT_SCHEDULE_FAILURE]: (state, action) => ({
    ...state,
    sideboxState: {
      loading: false,
      data: null,
      error: action.payload,
    },
  }),
});

export default BoardReducer;
