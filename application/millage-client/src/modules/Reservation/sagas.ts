import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getPlaceListApi,
  getPlaceByIdApi,
  createPlaceApi,
  updatePlaceApi,
  deletePlaceApi,
  createReservationApi,
  deleteReservationApi,
} from './api';
import {
  GetPlaceListRes,
  GetPlaceByIdRes,
  CreatePlaceRes,
  UpdatePlaceRes,
  DeletePlaceRes,
  CreateReservationRes,
  DeleteReservationRes,
} from './types';
import {
  getPlaceListAsync,
  getPlaceByIdAsync,
  createPlaceAsync,
  updatePlaceAsync,
  deletePlaceAsync,
  createReservationAsync,
  deleteReservationAsync,
} from './actions';

function* getPlaceListSaga(
    action: ReturnType<typeof getPlaceListAsync.request>,
) {
  try {
    const response : GetPlaceListRes = yield call(getPlaceListApi);
    yield put(getPlaceListAsync.success(response));
  } catch (error: any) {
    yield put(getPlaceListAsync.failure(error));
  }
}

function* getPlaceByIdSaga(
    action: ReturnType<typeof getPlaceByIdAsync.request>,
) {
  try {
    const response : GetPlaceByIdRes = yield call(
        getPlaceByIdApi,
        action.payload,
    );
    yield put(getPlaceByIdAsync.success(response));
  } catch (error: any) {
    yield put(getPlaceByIdAsync.failure(error));
  }
}

function* createPlaceSaga(
    action: ReturnType<typeof createPlaceAsync.request>,
) {
  try {
    const response : CreatePlaceRes = yield call(
        createPlaceApi,
        action.payload,
    );
    yield put(createPlaceAsync.success(response));
  } catch (error: any) {
    yield put(createPlaceAsync.failure(error));
  }
}

function* updatePlaceSaga(
    action: ReturnType<typeof updatePlaceAsync.request>,
) {
  try {
    const response : UpdatePlaceRes = yield call(
        updatePlaceApi,
        action.payload,
    );
    yield put(updatePlaceAsync.success(response));
  } catch (error: any) {
    yield put(updatePlaceAsync.failure(error));
  }
}

function* deletePlaceSaga(
    action: ReturnType<typeof deletePlaceAsync.request>,
) {
  try {
    const response : DeletePlaceRes = yield call(
        deletePlaceApi,
        action.payload,
    );
    yield put(deletePlaceAsync.success(response));
  } catch (error: any) {
    yield put(deletePlaceAsync.failure(error));
  }
}

function* createReservationSaga(
    action: ReturnType<typeof createReservationAsync.request>,
) {
  try {
    const response : CreateReservationRes = yield call(
        createReservationApi,
        action.payload,
    );
    yield put(createReservationAsync.success(response));
  } catch (error: any) {
    yield put(createReservationAsync.failure(error));
  }
}

function* deleteReservationSaga(
    action: ReturnType<typeof deleteReservationAsync.request>,
) {
  try {
    const response : DeleteReservationRes = yield call(
        deleteReservationApi,
        action.payload,
    );
    yield put(deleteReservationAsync.success(response));
  } catch (error: any) {
    yield put(deleteReservationAsync.failure(error));
  }
}

export default function* ReservationSagaListener() {
  yield takeLatest(getPlaceListAsync.request, getPlaceListSaga);
  yield takeLatest(getPlaceByIdAsync.request, getPlaceByIdSaga);
  yield takeLatest(createPlaceAsync.request, createPlaceSaga);
  yield takeLatest(updatePlaceAsync.request, updatePlaceSaga);
  yield takeLatest(deletePlaceAsync.request, deletePlaceSaga);
  yield takeLatest(createReservationAsync.request, createReservationSaga);
  yield takeLatest(deleteReservationAsync.request, deleteReservationSaga);
}
