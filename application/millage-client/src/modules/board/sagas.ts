import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  apiGetBoardById,
  apiGetBoardList,
  apiGetPost,
  apiTogglePostHeart,
  apiToggleVote,
} from './apis';
import {
  GetBoardByIdRes,
  GetBoardListRes,
  GetPostRes,
  TogglePostHeartRes,
  ToggleVoteRes,
} from './types';
import {
  getBoardByIdAsync,
  getBoardListAsync,
  getPostAsync,
  togglePostHeartAsync,
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
    action: ReturnType<typeof toggleVoteAsync.request>
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

export function* boardSagaListener() {
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
  yield takeLatest(getBoardByIdAsync.request, getBoardByIdSaga);
  yield takeLatest(getPostAsync.request, getPostSaga);
  yield takeLatest(togglePostHeartAsync.request, togglePostHeartSaga);
  yield takeLatest(toggleVoteAsync.request, toggleVoteSaga);
}

export default boardSagaListener;
