import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import BoardReducer from './board/reducer';
import UnitReducer from './Unit/reducer';
import UserReducer from './User/reducer';
import AdminReducer from './Admin/reducer';
import ScheduleReducer from './Schedule/reducer';
import {
  getMessageBoxListSagaListener,
  getMessagesSagaListener,
  setMessagesAsReadSagaListener,
} from './DM/sagas';
import boardSaga from './board/sagas';
import {
  getScheduleListSagaListener,
  getUnitScheduleListSagaListener,
  createScheduleSagaListener,
  updateScheduleSagaListener,
  deleteScheduleSagaListener,
} from './Schedule/sagas';
import {
  checkSessionListener,
  createUserSagaListener,
  loginSagaListener,
  updateUnreadListener,
  logoutSagaListener,
  validateUserSagaListener,
} from './User/sagas';
import {
  getUnitListSagaListener,
} from './Unit/sagas';
import {
  getUserListSagaListener,
  authUserSagaListener,
} from './Admin/sagas';

const rootReducer = combineReducers({
  DM: DMReducer,
  user: UserReducer,
  Board: BoardReducer,
  unit: UnitReducer,
  schedule: ScheduleReducer,
  admin: AdminReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([
    getMessageBoxListSagaListener(),
    getMessagesSagaListener(),
    createUserSagaListener(),
    loginSagaListener(),
    checkSessionListener(),
    boardSaga(),
    getUnitListSagaListener(),
    getScheduleListSagaListener(),
    getUnitScheduleListSagaListener(),
    createScheduleSagaListener(),
    updateScheduleSagaListener(),
    deleteScheduleSagaListener(),
    updateUnreadListener(),
    setMessagesAsReadSagaListener(),
    logoutSagaListener(),
    getUserListSagaListener(),
    validateUserSagaListener(),
    authUserSagaListener(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>
