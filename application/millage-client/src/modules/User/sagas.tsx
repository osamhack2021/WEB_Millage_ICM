import {call, put, takeLatest} from 'redux-saga/effects';
import {UserState} from './types';
import {createUserApi, loginApi, sessionApi} from './api';
import {createUserAsync, loginAsync, checkSessionAsync} from './actions';

function* createUserSaga(
    action: ReturnType<typeof createUserAsync.request>,
) {
  try {
    const param = action.payload;
    const response : UserState = yield call(createUserApi, param);
    if (response.result == 'success') {
      yield put(createUserAsync.success({
        result: 'registerSuccess',
      }));
    } else if (response.result == 'fail') {
      yield put(createUserAsync.failure({
        result: 'registerFail',
        message: response.message,
      }));
    } else {
      throw new Error(response.message);
    }
  } catch (error : any) {
    yield put(createUserAsync.failure({
      result: 'registerError',
      message: error.message,
    }));
  }
}

export function* createUserSagaListener() {
  yield takeLatest(createUserAsync.request, createUserSaga);
}

function* loginUserSaga(
    action: ReturnType<typeof loginAsync.request>,
) {
  try {
    const param = action.payload;
    const response : UserState = yield call(loginApi, param);
    if (response.result == 'success') {
      yield put(loginAsync.success(response));
    } else {
      yield put(loginAsync.failure(response));
    }
  } catch (error : any) {
    yield put(loginAsync.failure(error));
  }
}

export function* loginSagaListener() {
  yield takeLatest(loginAsync.request, loginUserSaga);
}

function* checkSessionSaga(
    action: ReturnType<typeof checkSessionAsync.request>,
) {
  try {
    const response : UserState = yield call(sessionApi);
    if (response.result == 'success') {
      yield put(checkSessionAsync.success(response));
    } else {
      yield put(checkSessionAsync.failure(response));
    }
  } catch (error : any) {
    yield put(checkSessionAsync.failure(error));
  }
}

export function* checkSessionListener() {
  yield takeLatest(checkSessionAsync.request, checkSessionSaga);
}


export {createUserSagaListener as default};
