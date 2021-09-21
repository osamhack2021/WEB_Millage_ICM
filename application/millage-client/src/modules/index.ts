import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    /* Reducer List */
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>