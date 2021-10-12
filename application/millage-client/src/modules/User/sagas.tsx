import {call, put, takeLatest} from 'redux-saga/effects';
import {UserState} from './types';
import {
  createUserApi,
  loginApi,
  sessionApi,
  updateUnreadApi,
  logoutApi,
  validateUserApi,
  updateUserApi,
} from './api';
import {
  createUserAsync,
  loginAsync,
  checkSessionAsync,
  updateUnreadAsync,
  logoutRequest,
  validateUserAsync,
  updateUserAsync,
} from './actions';

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


function* updateUnreadSaga(
    action: ReturnType<typeof updateUnreadAsync.request>,
) {
  try {
    const response : UserState = yield call(updateUnreadApi);
    yield put(updateUnreadAsync.success(response));
  } catch (error : any) {
    yield put(updateUnreadAsync.failure(error));
  }
}

export function* updateUnreadListener() {
  yield takeLatest(updateUnreadAsync.request, updateUnreadSaga);
}

function* logoutSaga(
    action: ReturnType<typeof logoutRequest>,
) {
  try {
    yield call(logoutApi);
  } catch (error : any) {
    console.log(error);
  }
}

export function* logoutSagaListener() {
  yield takeLatest(logoutRequest, logoutSaga);
}

function* validateUserSaga(
    action: ReturnType<typeof validateUserAsync.request>,
) {
  try {
    const param = action.payload;
    const response : string = yield call(validateUserApi, param);
    yield put(validateUserAsync.success(
        {
          result: 'success',
          message: response,
        },
    ));
  } catch (error : any) {
    yield put(validateUserAsync.failure(error));
  }
}

export function* validateUserSagaListener() {
  yield takeLatest(validateUserAsync.request, validateUserSaga);
}


function* updateUserSaga(
    action: ReturnType<typeof updateUserAsync.request>,
) {
  try {
    const param = action.payload;
    const response : string = yield call(updateUserApi, param);
    yield put(updateUserAsync.success({
      result: 'success',
    }));
  } catch (error : any) {
    yield put(updateUserAsync.failure(error));
  }
}

export function* updateUserSagaListener() {
  yield takeLatest(updateUserAsync.request, updateUserSaga);
}

