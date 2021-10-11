import {call, put, takeLatest} from 'redux-saga/effects';
import {
  authUserAsync,
  getUserlistAsync, setPageStateAction,
} from './actions';
import {getUserList, authUserApi} from './api';
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

function* authUserSaga(
    action: ReturnType<typeof authUserAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(authUserApi, param);
    if (response.result == 'success') {
      yield put(authUserAsync.success(response));
    } else {
      yield put(authUserAsync.failure(response));
    }
  } catch (error : any) {
    yield put(authUserAsync.failure(error));
  }
}

export function* authUserSagaListener() {
  yield takeLatest(authUserAsync.request, authUserSaga);
}
