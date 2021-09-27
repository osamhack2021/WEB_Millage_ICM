import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import BoardReducer from './board/reducer';
import dmSaga from './DM/sagas';
import boardSaga from './board/sagas';
import UserReducer from './User/reducer';
import {
  checkSessionListener,
  createUserSagaListener,
  loginSagaListener,
} from './User/sagas';

const rootReducer = combineReducers({
  DM: DMReducer,
  user: UserReducer,
  Board: BoardReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([
    dmSaga(),
    createUserSagaListener(),
    loginSagaListener(),
    checkSessionListener(),
    boardSaga(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>
