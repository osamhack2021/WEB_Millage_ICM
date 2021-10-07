import {call, put, takeLatest} from 'redux-saga/effects';
import {getScheduleListApi} from './api';
import {Schedules} from './types';
import {getScheduleListAsync} from './actions';

function* getScheduleListSaga(
    action: ReturnType<typeof getScheduleListAsync.request>,
) {
  try {
    const response : Schedules = yield call(getScheduleListApi);
    yield put(getScheduleListAsync.success(response));
  } catch (error: any) {
    yield put(getScheduleListAsync.failure(error));
  }
}

export function* getScheduleListSagaListener() {
  yield takeLatest(getScheduleListAsync.request, getScheduleListSaga);
}

export {getScheduleListSagaListener as default};
