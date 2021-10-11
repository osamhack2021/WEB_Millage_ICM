import {call, put, takeLatest} from 'redux-saga/effects';
import {
  authUnitAsync,
  authUserAsync,
  getUnitlistAsync,
  getUserlistAsync, setPageStateAction,
} from './actions';
import {
  getUserList,
  getUnitList,
  authUserApi,
  authUnitApi} from './api';
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


function* getUnitListSaga(
    action: ReturnType<typeof getUnitlistAsync.request>,
) {
  try {
    const response : AdminState = yield call(getUnitList);
    if (response.result == 'success') {
      yield put(getUnitlistAsync.success(response));
    } else {
      yield put(getUnitlistAsync.failure(response));
    }
  } catch (error : any) {
    yield put(getUnitlistAsync.failure(error));
  }
}

export function* getAdminUnitListSagaListener() {
  yield takeLatest(getUnitlistAsync.request, getUnitListSaga);
}

function* authUnitSaga(
    action: ReturnType<typeof authUnitAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(authUnitApi, param);
    if (response.result == 'success') {
      yield put(authUnitAsync.success(response));
    } else {
      yield put(authUnitAsync.failure(response));
    }
  } catch (error : any) {
    yield put(authUnitAsync.failure(error));
  }
}

export function* authUnitSagaListener() {
  yield takeLatest(authUnitAsync.request, authUnitSaga);
}
