import {createReducer} from 'typesafe-actions';
import {Board, BoardAction, BoardState, Comment} from './types';
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
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  INIT_CREATE_POST_STATE,
  CREATE_BOARD,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_FAILURE,
  INIT_CREATE_BOARD_STATE,
  INSERT_REPLY_FAILURE,
  INSERT_REPLY_REQUEST,
  INSERT_REPLY_SUCCESS,
  DELETE_REPLY_FAILURE,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_SUCCESS,
  LIKE_REPLY_FAILURE,
  LIKE_REPLY_REQUEST,
  LIKE_REPLY_SUCCESS,
  TOGGLE_BOARD_STAR_REQUEST,
  TOGGLE_BOARD_STAR_SUCCESS,
  TOGGLE_BOARD_STAR_FAILURE,
  TOGGLE_VOTE_SUCCESS,
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
  replyState: {
    result: '',
  },
  createPostState: {
    loading: false,
    data: null,
    error: null,
  },
  createBoardState: {
    loading: false,
    data: null,
    error: null,
  },
  starBoardState: {
    loading: false,
    error: false,
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
  [CREATE_BOARD]: (state) => ({
    ...state,
    createBoardState: {
      ...state.createBoardState,
      loading: true,
    },
  }),
  [CREATE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    createBoardState: {
      loading: false,
      data: action.payload.board,
      error: null,
    },
  }),
  [CREATE_BOARD_FAILURE]: (state, action) => ({
    ...state,
    createBoardState: {
      loading: false,
      data: null,
      error: action.payload,
    },
  }),
  [INIT_CREATE_BOARD_STATE]: (state) => ({
    ...state,
    createBoardState: {
      loading: false,
      data: null,
      error: null,
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
      const hasHearted: boolean =
        JSON.stringify(action.payload.post.hearts) !== '[]' ?
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

  [CREATE_POST]: (state) => ({
    ...state,
    createPostState: {
      ...state.createPostState,
      loading: true,
    },
  }),
  [CREATE_POST_SUCCESS]: (state, action) => ({
    ...state,
    createPostState: {
      ...state.createPostState,
      loading: false,
      data: action.payload.post,
    },
  }),
  [CREATE_POST_FAILURE]: (state) => ({
    ...state,
    createPostState: {
      ...state.createPostState,
      loading: false,
      data: null,
    },
  }),
  [INIT_CREATE_POST_STATE]: (state) => ({
    ...state,
    createPostState: {
      loading: false,
      data: null,
      error: null,
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

    const {isVoter} = state.postState.data;
    return {
      ...state,
      postState: {
        ...state.postState,
        data: {
          ...state.postState.data,
          isVoter: !isVoter,
        },
      },
    };
  },
  [TOGGLE_VOTE_SUCCESS]: (state, action) => {
    if (
      !state.postState.data ||
      state.postState.data.postType !== 'POLL'
    ) {
      return {...state};
    }
    return {
      ...state,
      postState: {
        ...state.postState,
        data: {
          ...state.postState.data,
          pollItems: action.payload.pollItems,
        },
      },
    };
  },

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
  [INSERT_REPLY_REQUEST]: (state, action) => ({
    ...state,
    replyState: {
      result: '',
    },
  }),
  [INSERT_REPLY_SUCCESS]: (state, action) => ({
    ...state,
    replyState: {
      result: 'insertReplySuccess',
    },
    postState: {
      ...state.postState,
      data: state.postState.data && {
        ...state.postState.data,
        comments: [
          ...state.postState.data.comments,
          action.payload.comment,
        ],
      },
    },
  }),
  [INSERT_REPLY_FAILURE]: (state, action) => ({
    ...state,
    replyState: {
      result: 'error',
      message: action.payload.message,
    },
  }),
  [DELETE_REPLY_REQUEST]: (state, action) => ({
    ...state,
    replyState: {
      result: '',
    },
  }),
  [DELETE_REPLY_SUCCESS]: (state, action) => {
    let comments: Comment[] = [];
    if (state.postState.data) {
      comments = [...state.postState.data.comments];
      comments = comments.filter((comment : Comment) => {
        return comment.id != action.payload.id;
      });
    }
    if (action.payload.comment) {
      comments = [
        ...comments,
        action.payload.comment,
      ];
    }

    return ({
      ...state,
      replyState: {
        result: 'deleteReplySuccess',
      },
      postState: {
        ...state.postState,
        data: state.postState.data && {
          ...state.postState.data,
          comments: comments,
        },
      },
    });
  },
  [DELETE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    replyState: {
      result: 'deleteReplyFail',
      message: action.payload.message,
    },
  }),
  [LIKE_REPLY_REQUEST]: (state, action) => ({
    ...state,
    replyState: {
      result: '',
    },
  }),
  [LIKE_REPLY_SUCCESS]: (state, action) => ({
    ...state,
    replyState: {
      result: 'likeReplySuccess',
    },
  }),
  [LIKE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    replyState: {
      result: 'likeReplyFail',
      message: action.payload.message,
    },
  }),
  [TOGGLE_BOARD_STAR_REQUEST]: (state, action) => ({
    ...state,
    starBoardState: {
      loading: true,
    },
  }),
  [TOGGLE_BOARD_STAR_SUCCESS]: (state, action) => {
    let list :Board[] = [];
    if (state.boardListState.data) {
      list = [...state.boardListState.data];
    }

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == action.payload.id) {
        list[i].isStarred = !list[i].isStarred;
        break;
      }
    }


    return ({
      ...state,
      starBoardState: {
        loading: false,
      },
      boardListState: {
        ...state.boardListState,
        data: list,
      },
    });
  },
  [TOGGLE_BOARD_STAR_FAILURE]: (state, action) => ({
    ...state,
    starBoardState: {
      loading: false,
      error: true,
    },
  }),

});

export default BoardReducer;
