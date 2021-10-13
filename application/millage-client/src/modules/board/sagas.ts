import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  apiGetBoardById,
  apiGetBoardList,
  apiGetPost,
  apiTogglePostHeart,
  apiToggleRecruit,
  apiToggleVote,
  getRecentSchedules,
  getRecruitAndPollList,
} from './apis';
import {
  GetBoardByIdRes,
  GetBoardListRes,
  GetPostRes,
  getRecentScheduleRes,
  getRecruitAndPollListRes,
  TogglePostHeartRes,
  ToggleRecruitRes,
  ToggleVoteRes,
} from './types';
import {
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  getRecentScheduleAsync,
  getRecruitAndPostListAsync,
  togglePostHeartAsync,
  toggleRecruitAsync,
  toggleVoteAsync,
} from './actions';
import {RootState} from '@modules';
import {UserData} from '@modules/User/types';
function* getBoardListSaga(
    action: ReturnType<typeof getBoardListAsync.request>,
) {
  // user state에서 community_id 가져와야 함.
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

export function* boardSagaListener() {
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
  yield takeLatest(getBoardByIdAsync.request, getBoardByIdSaga);
  yield takeLatest(getPostAsync.request, getPostSaga);
  yield takeLatest(togglePostHeartAsync.request, togglePostHeartSaga);
  yield takeLatest(toggleVoteAsync.request, toggleVoteSaga);
  yield takeLatest(toggleRecruitAsync.request, toggleRecruitSaga);
  yield takeLatest(getRecruitAndPostListAsync.request,
      getRecruitAndPostListSaga);
  yield takeLatest(getRecentScheduleAsync.request, getRecentScheduleSaga);
}

export default boardSagaListener;
