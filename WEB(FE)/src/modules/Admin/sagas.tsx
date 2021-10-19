import {call, put, takeLatest} from 'redux-saga/effects';
import {
  authUnitAsync,
  authUserAsync,
  deleteBoardAsync,
  deletePlaceAsync,
  deleteUnitAsync,
  deleteUserAsync,
  getBoardListAsync,
  getPlaceListAsync,
  getUnitlistAsync,
  getUserlistAsync,
  insertBoardAsync,
  insertPlaceAsync,
  updateBoardAsync,
  updatePlaceAsync,
  updateUserRoleAsync,
} from './actions';
import {
  getUserList,
  getUnitList,
  authUserApi,
  authUnitApi,
  deleteUnitApi,
  deleteUserApi,
  updateUserRoleApi,
  getBoardList,
  updateBoardApi,
  insertBoardApi,
  deleteBoardApi,
  deletePlaceApi,
  getPlaceList,
  insertPlaceApi,
  updatePlaceApi,
} from './api';
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

function* deleteUnitSaga(
    action: ReturnType<typeof deleteUnitAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(deleteUnitApi, param);
    if (response.result == 'success') {
      yield put(deleteUnitAsync.success(response));
    } else {
      yield put(deleteUnitAsync.failure(response));
    }
  } catch (error : any) {
    yield put(deleteUnitAsync.failure(error));
  }
}

function* deleteUserSaga(
    action: ReturnType<typeof deleteUserAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(deleteUserApi, param);
    if (response.result == 'success') {
      yield put(deleteUserAsync.success(response));
    } else {
      yield put(deleteUserAsync.failure(response));
    }
  } catch (error : any) {
    yield put(deleteUserAsync.failure(error));
  }
}

function* updateUserRoleSaga(
    action: ReturnType<typeof updateUserRoleAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(updateUserRoleApi,
        param.id, param.roleId);
    if (response.result == 'success') {
      yield put(updateUserRoleAsync.success(response));
    } else {
      yield put(updateUserRoleAsync.failure(response));
    }
  } catch (error : any) {
    yield put(updateUserRoleAsync.failure(error));
  }
}

function* getBoardListSaga(
    action: ReturnType<typeof getBoardListAsync.request>,
) {
  try {
    const response : AdminState = yield call(getBoardList);
    if (response.result == 'success') {
      yield put(getBoardListAsync.success(response));
    } else {
      yield put(getBoardListAsync.failure(response));
    }
  } catch (error : any) {
    yield put(getBoardListAsync.failure(error));
  }
}

function* updateBoardSaga(
    action: ReturnType<typeof updateBoardAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(updateBoardApi, param);
    if (response.result == 'success') {
      yield put(updateBoardAsync.success(response));
    } else {
      yield put(updateBoardAsync.failure(response));
    }
  } catch (error : any) {
    yield put(updateBoardAsync.failure(error));
  }
}

function* insertBoardSaga(
    action: ReturnType<typeof insertBoardAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(insertBoardApi, param);
    if (response.result == 'success') {
      yield put(getBoardListAsync.request());
      yield put(insertBoardAsync.success(response));
    } else {
      yield put(insertBoardAsync.failure(response));
    }
  } catch (error : any) {
    yield put(insertBoardAsync.failure(error));
  }
}

function* deleteBoardSaga(
    action: ReturnType<typeof deleteBoardAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(deleteBoardApi, param);
    if (response.result == 'success') {
      yield put(getBoardListAsync.request());
      yield put(deleteBoardAsync.success(response));
    } else {
      yield put(deleteBoardAsync.failure(response));
    }
  } catch (error : any) {
    yield put(deleteBoardAsync.failure(error));
  }
}


function* getPlaceListSaga(
    action: ReturnType<typeof getPlaceListAsync.request>,
) {
  try {
    const response : AdminState = yield call(getPlaceList);
    if (response.result == 'success') {
      yield put(getPlaceListAsync.success(response));
    } else {
      yield put(getPlaceListAsync.failure(response));
    }
  } catch (error : any) {
    yield put(getPlaceListAsync.failure(error));
  }
}

function* updatePlaceSaga(
    action: ReturnType<typeof updatePlaceAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(updatePlaceApi, param);
    if (response.result == 'success') {
      yield put(updatePlaceAsync.success(response));
    } else {
      yield put(updatePlaceAsync.failure(response));
    }
  } catch (error : any) {
    yield put(updatePlaceAsync.failure(error));
  }
}

function* insertPlaceSaga(
    action: ReturnType<typeof insertPlaceAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(insertPlaceApi, param);
    if (response.result == 'success') {
      yield put(getPlaceListAsync.request());
      yield put(insertPlaceAsync.success(response));
    } else {
      yield put(insertPlaceAsync.failure(response));
    }
  } catch (error : any) {
    yield put(insertPlaceAsync.failure(error));
  }
}

function* deletePlaceSaga(
    action: ReturnType<typeof deletePlaceAsync.request>,
) {
  try {
    const param = action.payload;
    const response : AdminState = yield call(deletePlaceApi, param);
    if (response.result == 'success') {
      yield put(getPlaceListAsync.request());
      yield put(deletePlaceAsync.success(response));
    } else {
      yield put(deletePlaceAsync.failure(response));
    }
  } catch (error : any) {
    yield put(deletePlaceAsync.failure(error));
  }
}

export default function* AdminSagaListener() {
  yield takeLatest(getUserlistAsync.request, getUserListSaga);
  yield takeLatest(updateUserRoleAsync.request, updateUserRoleSaga);
  yield takeLatest(deleteUserAsync.request, deleteUserSaga);
  yield takeLatest(deleteUnitAsync.request, deleteUnitSaga);
  yield takeLatest(authUnitAsync.request, authUnitSaga);
  yield takeLatest(getUnitlistAsync.request, getUnitListSaga);
  yield takeLatest(authUserAsync.request, authUserSaga);
  yield takeLatest(getBoardListAsync.request, getBoardListSaga);
  yield takeLatest(updateBoardAsync.request, updateBoardSaga);
  yield takeLatest(insertBoardAsync.request, insertBoardSaga);
  yield takeLatest(deleteBoardAsync.request, deleteBoardSaga);
  yield takeLatest(getPlaceListAsync.request, getPlaceListSaga);
  yield takeLatest(updatePlaceAsync.request, updatePlaceSaga);
  yield takeLatest(insertPlaceAsync.request, insertPlaceSaga);
  yield takeLatest(deletePlaceAsync.request, deletePlaceSaga);
}
