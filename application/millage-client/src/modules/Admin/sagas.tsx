import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getUserlistAsync,
} from './actions';
import {getUserList} from './api';
import {AdminState} from './types';

function* getUserListSaga(
    action: ReturnType<typeof getUserlistAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(getUserList, param);
    if (response.result == 'success') {
      yield put(getUserlistAsync.success(response));
    } else {
      yield put(getUserlistAsync.failure(response));
    }
  } catch (error : any) {
    yield put(getUserlistAsync.failure(error));
  }
}

export function* getUserListSagaListener() {
  yield takeLatest(getUserlistAsync.request, getUserListSaga);
}
