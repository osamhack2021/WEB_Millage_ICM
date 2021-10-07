import {createReducer} from 'typesafe-actions';

import {ScheduleAction, Schedules} from './types';
import {
  GET_SCHEDULE_LIST_REQUEST,
  GET_SCHEDULE_LIST_SUCCESS,
  GET_SCHEDULE_LIST_ERROR,
} from './actions';

const initialState: Schedules = {
  schedules: [],
};

const ScheduleReducer = createReducer<Schedules, ScheduleAction>(initialState, {
  [GET_SCHEDULE_LIST_REQUEST]: (state, action) => ({
    ...state,
  }),
  [GET_SCHEDULE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    schedules: action.payload.schedules,
  }),
  [GET_SCHEDULE_LIST_ERROR]: (state, action) => ({
    ...state,
    message: action.payload.message,
  }),
});

export default ScheduleReducer;
