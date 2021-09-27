import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import dmSaga from './DM/sagas';
import UserReducer from './User/reducer';
import {
  checkSessionListener,
  createUserSagaListener,
  loginSagaListener,
} from './User/sagas';

const rootReducer = combineReducers({
  DM: DMReducer,
  user: UserReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([
    dmSaga(),
    createUserSagaListener(),
    loginSagaListener(),
    checkSessionListener(),
  ]);
}

export type RootState = ReturnType<typeof rootReducer>
