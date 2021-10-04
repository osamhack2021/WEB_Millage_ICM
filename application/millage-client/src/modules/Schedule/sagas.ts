import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGetScheduleList} from './api';
import {Schedules} from './types';
import {getScheduleListAsync} from './actions';

function* getScheduleListSaga(
    action: ReturnType<typeof getScheduleListAsync.request>,
) {
  try {
    const response : Schedules = yield call(apiGetScheduleList);
    yield put(getScheduleListAsync.success(response));
  } catch (error : any) {
    yield put(getScheduleListAsync.failure(error));
  }
}

export function* getScheduleListSagaListener() {
  yield takeLatest(getScheduleListAsync.request, getScheduleListSaga);
}

export {getScheduleListSagaListener as default};
