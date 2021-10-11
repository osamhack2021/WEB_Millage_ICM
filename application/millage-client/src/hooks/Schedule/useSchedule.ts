import * as React from 'react';
import {RootState} from '@modules';
import {
  getScheduleListAsync,
  createScheduleAsync,
  updateScheduleAsync,
  deleteScheduleAsync,
} from '@modules/Schedule/actions';
import {useDispatch, useSelector} from 'react-redux';
import type {
  ScheduleList,
  CreateScheduleReq,
  UpdateScheduleReq,
  DeleteScheduleReq,
} from '@modules/Schedule/types';

const useSchedule: () => [
  ScheduleList,
  (req: CreateScheduleReq) => void,
  (req: UpdateScheduleReq) => void,
  (req: DeleteScheduleReq) => void
] = () => {
  const [scheduleList, setscheduleList] = React.useState<ScheduleList>([]);
  const schedule = useSelector((state: RootState) => state.schedule);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getScheduleListAsync.request());
  }, [dispatch]);
  React.useEffect(() => {
    setscheduleList(schedule.schedules);
  }, [schedule]);
  const createSchedule = React.useCallback((req: CreateScheduleReq) => {
    dispatch(createScheduleAsync.request(req));
    setscheduleList(schedule.schedules);
  }, []);
  const updateSchedule = React.useCallback((req: UpdateScheduleReq) => {
    dispatch(updateScheduleAsync.request(req));
    setscheduleList(schedule.schedules);
  }, []);
  const deleteSchedule = React.useCallback((req: DeleteScheduleReq) => {
    dispatch(deleteScheduleAsync.request(req));
    setscheduleList(scheduleList.filter(({id}) => id !== req.id));
  }, []);

  return [
    scheduleList,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  ];
};

export default useSchedule;
