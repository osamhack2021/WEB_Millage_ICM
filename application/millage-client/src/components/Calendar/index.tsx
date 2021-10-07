import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import FullCalendar, {CustomButtonInput} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Dialog from './Dialog';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState<'add' | 'edit' | 'delete'>('add');

  const [scheduleList] = useSchedule();

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const addEvents: CustomButtonInput = {
    text: '추가',
    click: () => {
      setState('add');
      handleOpen();
    },
  };

  const editEvents: CustomButtonInput = {
    text: '편집',
    click: () => {
      setState('edit');
      handleOpen();
    },
  };

  const deleteEvents: CustomButtonInput = {
    text: '삭제',
    click: () => {
      setState('delete');
      handleOpen();
    },
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        locale='ko'
        dayCellContent={({date}) => date.getDate()}
        weekNumbers
        weekNumberContent={(week) => `${week.num}주차`}
        headerToolbar={{
          start: 'prev,next today',
          center: 'addEvents,editEvents,deleteEvents',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={scheduleList}
        fixedWeekCount={false}
        customButtons={{
          addEvents,
          editEvents,
          deleteEvents,
        }}
      />
      <Dialog
        visible={visible}
        handleClose={handleClose}
        state={state}
      />
    </>
  );
};

export default Calendar;
