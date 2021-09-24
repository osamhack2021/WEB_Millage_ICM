import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetMessageBoxList} from './api';
import {DMState} from './types';
import {getMessageBoxListAsync} from './actions';

function* getMessageBoxListSaga(
    action: ReturnType<typeof getMessageBoxListAsync.request>,
) {
  try {
    const response : DMState = yield call(apiGetMessageBoxList);
    yield put(getMessageBoxListAsync.success(response));
  } catch (error : any) {
    yield put(getMessageBoxListAsync.failure(error));
  }
}

export function* getMessageBoxListSagaListener() {
  yield takeLatest(getMessageBoxListAsync.request, getMessageBoxListSaga);
}

export {getMessageBoxListSagaListener as default};
