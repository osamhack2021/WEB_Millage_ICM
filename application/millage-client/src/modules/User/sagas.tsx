import {call, put, takeLatest} from 'redux-saga/effects';
import {UserState} from './types';
import {createUserApi} from './api';
import {createUserAsync} from './actions';

function* createUserSaga(
    action: ReturnType<typeof createUserAsync.request>,
) {
  try {
    const param = action.payload;
    const response : UserState = yield call(createUserApi, param);
    if (response.result == 'success') {
      yield put(createUserAsync.success(response));
    } else {
      yield put(createUserAsync.failure(response));
    }
  } catch (error : any) {
    yield put(createUserAsync.failure(error));
  }
}

export function* createUserSagaListener() {
  yield takeLatest(createUserAsync.request, createUserSaga);
}

export {createUserSagaListener as default};
