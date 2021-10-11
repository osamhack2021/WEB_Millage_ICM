import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getScheduleListApi,
  getUnitScheduleListApi,
  createScheduleApi,
  updateScheduleApi,
  deleteScheduleApi,
} from './api';
import {
  GetScheduleListRes,
  CreateScheduleRes,
  UpdateScheduleRes,
  DeleteScheduleRes,
} from './types';
import {
  getScheduleListAsync,
  getUnitScheduleListAsync,
  createScheduleAsync,
  updateScheduleAsync,
  deleteScheduleAsync,
} from './actions';

function* getScheduleListSaga(
    action: ReturnType<typeof getScheduleListAsync.request>,
) {
  try {
    const response : GetScheduleListRes = yield call(getScheduleListApi);
    yield put(getScheduleListAsync.success(response));
  } catch (error: any) {
    yield put(getScheduleListAsync.failure(error));
  }
}

export function* getScheduleListSagaListener() {
  yield takeLatest(getScheduleListAsync.request, getScheduleListSaga);
}

function* getUnitScheduleListSaga(
    action: ReturnType<typeof getUnitScheduleListAsync.request>,
) {
  try {
    const response : GetScheduleListRes = yield call(getUnitScheduleListApi);
    yield put(getUnitScheduleListAsync.success(response));
  } catch (error: any) {
    yield put(getUnitScheduleListAsync.failure(error));
  }
}

export function* getUnitScheduleListSagaListener() {
  yield takeLatest(getUnitScheduleListAsync.request, getUnitScheduleListSaga);
}

function* createScheduleSaga(
    action: ReturnType<typeof createScheduleAsync.request>,
) {
  try {
    const response : CreateScheduleRes = yield call(
        createScheduleApi,
        action.payload
    );
    yield put(createScheduleAsync.success(response));
  } catch (error: any) {
    yield put(createScheduleAsync.failure(error));
  }
}

export function* createScheduleSagaListener() {
  yield takeLatest(createScheduleAsync.request, createScheduleSaga);
}

function* updateScheduleSaga(
    action: ReturnType<typeof updateScheduleAsync.request>,
) {
  try {
    const response : UpdateScheduleRes = yield call(
        updateScheduleApi,
        action.payload,
    );
    yield put(updateScheduleAsync.success(response));
  } catch (error: any) {
    yield put(updateScheduleAsync.failure(error));
  }
}

export function* updateScheduleSagaListener() {
  yield takeLatest(updateScheduleAsync.request, updateScheduleSaga);
}

function* deleteScheduleSaga(
    action: ReturnType<typeof deleteScheduleAsync.request>,
) {
  try {
    const response : DeleteScheduleRes = yield call(
        deleteScheduleApi,
        action.payload,
    );
    yield put(deleteScheduleAsync.success(response));
  } catch (error: any) {
    yield put(deleteScheduleAsync.failure(error));
  }
}

export function* deleteScheduleSagaListener() {
  yield takeLatest(deleteScheduleAsync.request, deleteScheduleSaga);
}
