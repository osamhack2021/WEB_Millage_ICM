import * as React from 'react';
import FullCalendar, {
  EventInput,
  CustomButtonInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Dialog from './Dialog';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [events, setEvents] = React.useState<Array<EventInput>>([{
    id: '1',
    title: 'hello',
    start: new Date('2021-10-23 12:00'),
    end: new Date('2021-10-24 12:00'),
    content: 'test1',
  }, {
    id: '2',
    title: 'dang jik',
    start: new Date('2021-10-28'),
    content: 'test2',
  }]);

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
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        locale='ko'
        dayCellContent={({date}) => date.getDate()}
        weekNumbers
        weekNumberContent={(week) => `${week.num}주차`}
        height={1000}
        headerToolbar={{
          start: 'prev,next today',
          center: 'addEvents,editEvents,deleteEvents',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable
        fixedWeekCount={false}
        customButtons={{
          addEvents,
          editEvents,
          deleteEvents,
        }}
        eventDrop={(({event}) => {
          console.log(event.toJSON());
          const tmp: EventInput = {
            id: event.id,
            groupId: event.groupId,
            title: event.title,
            extendedProps: event.extendedProps,
            start: event.start ? event.start : undefined,
            end: event.end ? event.end : undefined,
            color: event.textColor,
          };
          setEvents([tmp, ...events.filter((e) => e.id != tmp.id)]);
        })}
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
