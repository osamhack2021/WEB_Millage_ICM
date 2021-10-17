import {createReducer} from 'typesafe-actions';
import {Schedule, ScheduleAction, ScheduleRes, ScheduleState} from './types';
import {
  GET_SCHEDULE_LIST_REQUEST,
  GET_SCHEDULE_LIST_SUCCESS,
  GET_SCHEDULE_LIST_ERROR,
  GET_UNIT_SCHEDULE_LIST_REQUEST,
  GET_UNIT_SCHEDULE_LIST_SUCCESS,
  GET_UNIT_SCHEDULE_LIST_ERROR,
  CREATE_SCHEDULE_REQUEST,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_ERROR,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_ERROR,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_ERROR,
} from './actions';

const initialState: ScheduleState = {
  schedules: [],
  result: '',
  message: '',
};

const convertResToData: (schedule: ScheduleRes) => Schedule = (schedule) => {
  return {
    id: schedule.id.toString(),
    groupId: schedule.groupType,
    title: schedule.title,
    content: schedule.content,
    start: convertDate(new Date(schedule.start)),
    end: schedule.end ? convertDate(new Date(schedule.end)) : undefined,
  };
};

const convertDate = (date : Date) => {
  try {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
    );
  } catch (err) {
    return date;
  }
};

const ScheduleReducer = createReducer<ScheduleState, ScheduleAction>(
    initialState, {
      [GET_SCHEDULE_LIST_REQUEST]: (state, action) => ({
        ...state,
      }),
      [GET_SCHEDULE_LIST_SUCCESS]: (state, action) => ({
        ...state,
        schedules: action.payload.schedules.map<Schedule>((schedule) =>
          convertResToData(schedule),
        ),
      }),
      [GET_SCHEDULE_LIST_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [GET_UNIT_SCHEDULE_LIST_REQUEST]: (state, action) => ({
        ...state,
      }),
      [GET_UNIT_SCHEDULE_LIST_SUCCESS]: (state, action) => ({
        ...state,
        schedules: action.payload.schedules.map<Schedule>((schedule) =>
          convertResToData(schedule),
        ),
      }),
      [GET_UNIT_SCHEDULE_LIST_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [CREATE_SCHEDULE_REQUEST]: (state, action) => ({
        ...state,
      }),
      [CREATE_SCHEDULE_SUCCESS]: (state, action) => ({
        ...state,
        schedules: [
          ...state.schedules,
          convertResToData(action.payload.schedule),
        ],
      }),
      [CREATE_SCHEDULE_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [UPDATE_SCHEDULE_REQUEST]: (state, action) => ({
        ...state,
      }),
      [UPDATE_SCHEDULE_SUCCESS]: (state, action) => ({
        ...state,
        schedules: [
          ...state.schedules.filter(({id}) => (
            id !== action.payload.schedule.id.toString()
          )),
          convertResToData(action.payload.schedule),
        ],
      }),
      [UPDATE_SCHEDULE_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
      [DELETE_SCHEDULE_REQUEST]: (state, action) => ({
        ...state,
      }),
      [DELETE_SCHEDULE_SUCCESS]: (state, action) => ({
        ...state,
        result: action.payload.result,
      }),
      [DELETE_SCHEDULE_ERROR]: (state, action) => ({
        ...state,
        result: action.payload.result,
        message: action.payload.message,
      }),
    });

export default ScheduleReducer;
