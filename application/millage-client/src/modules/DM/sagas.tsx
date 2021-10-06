import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetMessageBoxList, apiGetMessages} from './api';
import {DMState} from './types';
import {getMessageBoxListAsync, getMessagesAsync} from './actions';

function* getMessageBoxListSaga(
    action: ReturnType<typeof getMessageBoxListAsync.request>,
) {
  try {
    const response : DMState = yield call(apiGetMessageBoxList);
    yield put(getMessageBoxListAsync.success(response));
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


export {getMessageBoxListSagaListener as default};
