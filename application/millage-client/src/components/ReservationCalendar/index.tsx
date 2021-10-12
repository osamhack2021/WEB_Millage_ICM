import * as React from 'react';
import FullCalendar, {CustomButtonInput} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './ReservationCalendar.css';
const ReservationCalendar: React.FC = () => {
  const addEvents: CustomButtonInput = {
    text: '예약 신청',
    click: () => {
    },
  };

  const deleteEvents: CustomButtonInput = {
    text: '예약 취소',
    click: () => {
    },
  };

  return (
    <div className='calendar-wrapper'>
      <FullCalendar
        plugins={[timeGridPlugin]}
        locale='ko'
        height='80vh'
        nowIndicator
        dayCellContent={({date}) => date.getDate()}
        weekNumbers
        weekNumberContent={(week) => `${week.num}주`}
        headerToolbar={{
          start: 'today',
          center: 'prev,next',
          end: 'addEvents,deleteEvents',
        }}
        buttonText={{
          today: '당일로 이동',
          week: '주간',
        }}
        fixedWeekCount={false}
        customButtons={{
          addEvents,
          deleteEvents,
        }}
      />
    </div>
  );
};

export default ReservationCalendar;
