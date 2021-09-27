import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetBoardList} from './apis';
import {GetBoardListRes} from './types';
import {getBoardListAsync} from './actions';

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

export function* getBoardListSagaListener() {
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
}

export default getBoardListSagaListener;
