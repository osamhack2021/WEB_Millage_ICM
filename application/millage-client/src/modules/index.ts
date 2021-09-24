import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import dmSaga from './DM/sagas';

const rootReducer = combineReducers({
  DM: DMReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([dmSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>
