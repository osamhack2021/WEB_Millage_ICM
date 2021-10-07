import * as React from 'react';
import {RootState} from '@modules';
import {getScheduleListAsync} from '@modules/Schedule/actions';
import {useDispatch, useSelector} from 'react-redux';
import {EventData} from '@modules/Schedule/types';

const useSchedule: () => [
  Array<EventData>,
  (event: EventData) => void,
  (event: EventData) => void,
  (removeId: string) => void
] = () => {
  const [events, setEvents] = React.useState<Array<EventData>>([]);
  const schedule = useSelector((state: RootState) => state.schedule);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getScheduleListAsync.request());
  }, [dispatch]);
  React.useEffect(() => {
    setEvents(schedule.schedules);
  }, [schedule]);
  const createSchedule = React.useCallback((event: EventData) => {
    setEvents([...events, event]);
    dispatch(getScheduleListAsync.request());
  }, []);
  const updateSchedule = React.useCallback((event: EventData) => {
    if (events.find(({id}) => id === event.id) !== undefined) {
      const index = events.findIndex(({id}) => id === event.id);
      const tmp = events;
      tmp[index] = event;
      setEvents(tmp);
      dispatch(getScheduleListAsync.request());
    }
  }, []);
  const deleteSchedule = React.useCallback((removeId: string) => {
    setEvents(events.filter(({id}) => id !== removeId));
    dispatch(getScheduleListAsync.request());
  }, []);

  return [
    events,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  ];
};

export default useSchedule;
