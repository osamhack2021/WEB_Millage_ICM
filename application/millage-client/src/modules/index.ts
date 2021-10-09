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
import scheduleSaga from './Schedule/sagas';
import {
  checkSessionListener,
  createUserSagaListener,
  loginSagaListener,
  updateUnreadListener,
  logoutSagaListener,
} from './User/sagas';
import {
  getUnitListSagaListener,
} from './Unit/sagas';
import {
  getUserListSagaListener,
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
    scheduleSaga(),
    updateUnreadListener(),
    setMessagesAsReadSagaListener(),
    logoutSagaListener(),
    getUserListSagaListener(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>
