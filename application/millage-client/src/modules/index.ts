import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import BoardReducer from './board/reducer';
import UnitReducer from './Unit/reducer';
import UserReducer from './User/reducer';
import AdminReducer from './Admin/reducer';
import ScheduleReducer from './Schedule/reducer';
import ReservationReducer from './Reservation/reducer';
import DMSagaListener from './DM/sagas';
import boardSaga from './board/sagas';
import ScheduleSagaListener from './Schedule/sagas';
import UserSagaListener from './User/sagas';
import UnitSagaListener from './Unit/sagas';
import AdminSagaListener from './Admin/sagas';
import ReservationSagaListener from './Reservation/sagas';

const rootReducer = combineReducers({
  DM: DMReducer,
  user: UserReducer,
  Board: BoardReducer,
  unit: UnitReducer,
  schedule: ScheduleReducer,
  admin: AdminReducer,
  reservation: ReservationReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([
    UserSagaListener(),
    boardSaga(),
    UnitSagaListener(),
    ScheduleSagaListener(),
    AdminSagaListener(),
    DMSagaListener(),
    ReservationSagaListener(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>
