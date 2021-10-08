import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetBoardById, apiGetBoardList} from './apis';
import {GetBoardByIdRes, GetBoardListRes} from './types';
import {getBoardByIdAsync, getBoardListAsync} from './actions';

function* getBoardListSaga(
    action: ReturnType<typeof getBoardListAsync.request>,
) {
  // user state에서 community_id 가져와야 함.
  try {
    const response: GetBoardListRes = yield call(apiGetBoardList);
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

export function* boardSagaListener() {
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
  yield takeLatest(getBoardByIdAsync.request, getBoardByIdSaga);
}

export default boardSagaListener;
