import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';

const Calendar: React.FC = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      locale='ko'
      dayCellContent={({date}) => date.getDate()}
      weekNumbers
      weekNumberFormat={{week: 'numeric'}}
    />
  );
};

export default Calendar;
