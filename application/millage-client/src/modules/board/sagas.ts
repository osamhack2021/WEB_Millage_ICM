import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetBoardById, apiGetBoardList, apiGetPost} from './apis';
import {GetBoardByIdRes, GetBoardListRes, GetPostRes} from './types';
import {getBoardByIdAsync, getBoardListAsync, getPostAsync} from './actions';

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
    const response: GetPostRes = yield call(
        apiGetPost,
        action.payload,
    );
    yield put(getPostAsync.success(response));
  } catch (error: any) {
    yield put(getPostAsync.failure(error));
  }
}

export function* boardSagaListener() {
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
  yield takeLatest(getBoardByIdAsync.request, getBoardByIdSaga);
  yield takeLatest(getPostAsync.request, getPostSaga);
}

export default boardSagaListener;
