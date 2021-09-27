import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import DMReducer from './DM/reducer';
import BoardReducer from './board/reducer';
import dmSaga from './DM/sagas';
import boardSaga from './board/sagas';

const rootReducer = combineReducers({
  DM: DMReducer,
  Board: BoardReducer,
});

export default rootReducer;

export function* rootSaga() {
  yield all([dmSaga(), boardSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>
