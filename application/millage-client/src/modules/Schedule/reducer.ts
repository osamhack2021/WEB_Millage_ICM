import {createReducer} from 'typesafe-actions';

import {ScheduleAction, Schedules} from './types';
import {GET_SCHEDULE_LIST, GET_SCHEDULE_LIST_SUCCESS} from './actions';

const initialState: Schedules = {
  schedules: [],
};

const DMReducer = createReducer<Schedules, ScheduleAction>(initialState, {
  [GET_SCHEDULE_LIST]: (state, action) => ({
    ...state,
  }),
  [GET_SCHEDULE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    schedules: action.payload.schedules,
  }),
});

export default DMReducer;
