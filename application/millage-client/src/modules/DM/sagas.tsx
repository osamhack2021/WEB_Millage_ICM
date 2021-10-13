import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetMessageBoxList,
  apiGetMessages,
  apiSetMessagesAsRead,
  deleteMessages,
  getUsersApi} from './api';
import {DMState} from './types';
import {getMessageBoxListAsync,
  getMessagesAsync,
  setMessagesAsRead,
  deleteMessagesAsync,
  getUsersAsync} from './actions';
import {updateUnreadAsync} from '@modules/User/actions';

function* getMessageBoxListSaga(
    action: ReturnType<typeof getMessageBoxListAsync.request>,
) {
  try {
    const response : DMState = yield call(apiGetMessageBoxList);
    yield put(getMessageBoxListAsync.success(response));
    yield put(updateUnreadAsync.request());
  } catch (error : any) {
    yield put(getMessageBoxListAsync.failure({
      result: 'fail',
      message: error,
    }));
  }
}

export function* getMessageBoxListSagaListener() {
  yield takeLatest(getMessageBoxListAsync.request, getMessageBoxListSaga);
}

function* getMessagesSaga(
    action: ReturnType<typeof getMessagesAsync.request>,
) {
  try {
    const param = action.payload;
    const response : DMState = yield call(apiGetMessages, param);
    yield put(getMessagesAsync.success(response));
    yield put(updateUnreadAsync.request());
  } catch (error : any) {
    yield put(getMessageBoxListAsync.failure({
      result: 'fail',
      message: error,
    }));
  }
}

export function* getMessagesSagaListener() {
  yield takeLatest(getMessagesAsync.request, getMessagesSaga);
}

function* setMessagesAsReadSaga(
    action: ReturnType<typeof setMessagesAsRead>,
) {
  const param = action.payload;
  yield call(apiSetMessagesAsRead, param);
  yield put(updateUnreadAsync.request());
}

export function* setMessagesAsReadSagaListener() {
  yield takeLatest(setMessagesAsRead, setMessagesAsReadSaga);
}

function* deleteMessagesSaga(
    action: ReturnType<typeof deleteMessagesAsync.request>,
) {
  try {
    const param = action.payload;
    const response : DMState = yield call(deleteMessages, param);
    yield put(getMessageBoxListAsync.request());
    yield put(deleteMessagesAsync.success(response));
  } catch (error : any) {
    yield put(deleteMessagesAsync.failure({
      result: 'fail',
      message: error,
    }));
  }
}

export function* deleteMessagesSagaListener() {
  yield takeLatest(deleteMessagesAsync.request, deleteMessagesSaga);
}

function* getUsersSaga(
    action: ReturnType<typeof getUsersAsync.request>,
) {
  try {
    const response : DMState = yield call(getUsersApi);
    yield put(getUsersAsync.success(response));
  } catch (error : any) {
    yield put(getUsersAsync.failure({
      result: 'fail',
      message: error,
    }));
  }
}

export function* getUsersSagaListener() {
  yield takeLatest(getUsersAsync.request, getUsersSaga);
}
