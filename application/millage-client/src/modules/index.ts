import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({
  /* Reducer List */
});

export default rootReducer;

export function* rootSaga() {
  yield all([]);
}

export type RootState = ReturnType<typeof rootReducer>
