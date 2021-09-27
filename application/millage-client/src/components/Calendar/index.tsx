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
  const [events, setEvents] = React.useState<Array<EventInput>>([{
    id: '1',
    title: 'hello',
    start: new Date('2021-09-23 12:00'),
    end: new Date('2021-09-24 12:00'),
  }, {
    id: '2',
    title: 'dang jik',
    start: new Date('2021-09-28'),
  }]);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const addEvents: CustomButtonInput = {
    text: '추가하기',
    click: () => {
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
          center: '',
          end: 'addEvents dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable
        fixedWeekCount={false}
        customButtons={{
          addEvents,
        }}
        eventDrop={(({event}) => {
          const tmp: EventInput = {
            id: event.id,
            title: event.title,
            start: event.start ? event.start : undefined,
            end: event.end ? event.end : undefined,
            url: event.url,
            color: event.textColor,
          };
          setEvents([tmp, ...events.filter((e) => e.id != tmp.id)]);
        })}
      />
      <Dialog
        visible={visible}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default Calendar;
