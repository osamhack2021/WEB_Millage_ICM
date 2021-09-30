import {call, put, takeLatest} from 'redux-saga/effects';
import {UnitState} from './types';
import {getUnitListAsync} from './actions';
import {getUnitListApi} from './api';

function* getUnitListSaga(
    action: ReturnType<typeof getUnitListAsync.request>,
) {
  try {
    const response : UnitState = yield call(getUnitListApi);
    if (response.result == 'success') {
      yield put(getUnitListAsync.success(response));
    } else {
      yield put(getUnitListAsync.failure(response));
    }
  } catch (error : any) {
    yield put(getUnitListAsync.failure(error));
  }
}

export function* getUnitListSagaListener() {
  yield takeLatest(getUnitListAsync.request, getUnitListSaga);
}


export {getUnitListSagaListener as default};
