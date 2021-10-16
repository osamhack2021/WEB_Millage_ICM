import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  apiCreateBoard,
  apiCreatePost,
  apiGetBoardById,
  apiGetBoardList,
  apiGetPost,
  apiTogglePostHeart,
  apiToggleRecruit,
  apiToggleVote,
  deleteReplyApi,
  getRecentSchedules,
  getRecruitAndPollList,
  insertReplyApi,
  likeReplyApi,
  toggleBoardStarApi,
} from './apis';
import {
  CreateBoardRes,
  CreatePostRes,
  deleteReplyRes,
  GetBoardByIdRes,
  GetBoardListRes,
  GetPostRes,
  getRecentScheduleRes,
  getRecruitAndPollListRes,
  insertReplyRes,
  TogglePostHeartRes,
  ToggleRecruitRes,
  ToggleVoteRes,
} from './types';
import {
  createBoardAsync,
  createPostAsync,
  deleteReplyAsync,
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  getRecentScheduleAsync,
  getRecruitAndPostListAsync,
  insertReplyAsync,
  likeReplyAsync,
  toggleBoardStarAsync,
  togglePostHeartAsync,
  toggleRecruitAsync,
  toggleVoteAsync,
} from './actions';
import {RootState} from '@modules';
import {UserData} from '@modules/User/types';
import {CommonResponse} from '@utils/commonTypes';
function* getBoardListSaga(
    action: ReturnType<typeof getBoardListAsync.request>,
) {
  try {
    const response: GetBoardListRes = yield call(
        apiGetBoardList,
        action.payload,
    );
    yield put(getBoardListAsync.success(response));
  } catch (error: any) {
    yield put(getBoardListAsync.failure(error));
  }
}

function* getBoardByIdSaga(
    action: ReturnType<typeof getBoardByIdAsync.request>,
) {
  try {
    const response: GetBoardByIdRes = yield call(
        apiGetBoardById,
        action.payload,
    );
    yield put(getBoardByIdAsync.success(response));
  } catch (error: any) {
    yield put(getBoardByIdAsync.failure(error));
  }
}

function* createBoardSaga(
    action: ReturnType<typeof createBoardAsync.request>,
) {
  try {
    const response: CreateBoardRes = yield call(
        apiCreateBoard,
        action.payload,
    );
    yield put(createBoardAsync.success(response));
  } catch (error: any) {
    yield put(createBoardAsync.failure(error));
  }
}

function* getPostSaga(
    action: ReturnType<typeof getPostAsync.request>,
) {
  try {
    const session: UserData = yield select(
        (state: RootState) => state.user.session,
    );
    const response: GetPostRes = yield call(
        apiGetPost,
        action.payload,
    );

    yield put(getPostAsync.success({
      ...response, session,
    }));
  } catch (error: any) {
    yield put(getPostAsync.failure(error));
  }
}

function* createPostSaga(
    action: ReturnType<typeof createPostAsync.request>,
) {
  try {
    const response: CreatePostRes = yield call(
        apiCreatePost,
        action.payload,
    );
    yield put(createPostAsync.success(response));
  } catch (error: any) {
    yield put(createPostAsync.failure(error));
  }
}

function* togglePostHeartSaga(
    action: ReturnType<typeof togglePostHeartAsync.request>,
) {
  try {
    const response: TogglePostHeartRes = yield call(
        apiTogglePostHeart,
        action.payload,
    );
    yield put(togglePostHeartAsync.success(response));
  } catch (error: any) {
    yield put(togglePostHeartAsync.failure(error));
  }
}

function* toggleVoteSaga(
    action: ReturnType<typeof toggleVoteAsync.request>,
) {
  try {
    const response: ToggleVoteRes = yield call(
        apiToggleVote,
        action.payload,
    );
    yield put(toggleVoteAsync.success(response));
  } catch (error: any) {
    yield put(toggleVoteAsync.failure(error));
  }
}

function* toggleRecruitSaga(
    action: ReturnType<typeof toggleRecruitAsync.request>,
) {
  try {
    const response: ToggleRecruitRes = yield call(
        apiToggleRecruit,
        action.payload,
    );
    yield put(toggleRecruitAsync.success(response));
  } catch (error: any) {
    yield put(toggleRecruitAsync.failure(error));
  }
}

function* getRecruitAndPostListSaga(
    action: ReturnType<typeof getRecruitAndPostListAsync.request>,
) {
  try {
    const response: getRecruitAndPollListRes = yield call(
        getRecruitAndPollList,
    );
    yield put(getRecruitAndPostListAsync.success(response));
  } catch (error: any) {
    yield put(getRecruitAndPostListAsync.failure(error));
  }
}

function* getRecentScheduleSaga(
    action: ReturnType<typeof getRecentScheduleAsync.request>,
) {
  try {
    const response: getRecentScheduleRes = yield call(
        getRecentSchedules,
    );
    yield put(getRecentScheduleAsync.success(response));
  } catch (error: any) {
    yield put(getRecentScheduleAsync.failure(error));
  }
}

function* insertReplySaga(
    action: ReturnType<typeof insertReplyAsync.request>,
) {
  try {
    const param = action.payload;
    const response: insertReplyRes = yield call(
        insertReplyApi,
        param,
    );
    yield put(insertReplyAsync.success(response));
  } catch (error: any) {
    yield put(insertReplyAsync.failure(error));
  }
}

function* deleteReplySaga(
    action: ReturnType<typeof deleteReplyAsync.request>,
) {
  try {
    const param = action.payload;
    const response: deleteReplyRes = yield call(
        deleteReplyApi,
        param,
    );
    yield put(deleteReplyAsync.success(response));
  } catch (error: any) {
    yield put(deleteReplyAsync.failure(error));
  }
}

function* likeReplySaga(
    action: ReturnType<typeof likeReplyAsync.request>,
) {
  try {
    const param = action.payload;
    const response: CommonResponse = yield call(
        likeReplyApi,
        param,
    );
    yield put(likeReplyAsync.success(response));
  } catch (error: any) {
    yield put(likeReplyAsync.failure(error));
  }
}

function* toggleBoardStarSaga(
    action: ReturnType<typeof toggleBoardStarAsync.request>,
) {
  try {
    const param = action.payload;
    const response: CommonResponse = yield call(
        toggleBoardStarApi,
        param,
    );
    yield put(toggleBoardStarAsync.success({
      ...response,
      id: param,
    }));
  } catch (error: any) {
    yield put(toggleBoardStarAsync.failure(error));
  }
}

export function* boardSagaListener() {
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
  yield takeLatest(getBoardByIdAsync.request, getBoardByIdSaga);
  yield takeLatest(createBoardAsync.request, createBoardSaga);
  yield takeLatest(getPostAsync.request, getPostSaga);
  yield takeLatest(createPostAsync.request, createPostSaga);
  yield takeLatest(togglePostHeartAsync.request, togglePostHeartSaga);
  yield takeLatest(toggleVoteAsync.request, toggleVoteSaga);
  yield takeLatest(toggleRecruitAsync.request, toggleRecruitSaga);
  yield takeLatest(getRecruitAndPostListAsync.request,
      getRecruitAndPostListSaga);
  yield takeLatest(getRecentScheduleAsync.request, getRecentScheduleSaga);
  yield takeLatest(insertReplyAsync.request, insertReplySaga);
  yield takeLatest(deleteReplyAsync.request, deleteReplySaga);
  yield takeLatest(likeReplyAsync.request, likeReplySaga);
  yield takeLatest(toggleBoardStarAsync.request, toggleBoardStarSaga);
}

export default boardSagaListener;
