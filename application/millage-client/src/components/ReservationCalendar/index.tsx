import * as React from 'react';
import FullCalendar, {CustomButtonInput} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './ReservationCalendar.css';
import {useReservation} from '@hooks/reservation';
import Dialog from './Dialog';
import {useDispatch} from 'react-redux';
import {
  getPlaceByIdAsync,
  getPlaceListAsync,
} from '@modules/Reservation/actions';


const ReservationCalendar: React.FC<any> = ({match}) => {
  const dispatch = useDispatch();
  const [place] = useReservation();
  const [state, setState] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    dispatch(getPlaceListAsync.request());
    dispatch(getPlaceByIdAsync.request({id: match.params.placeId}));
  }, [match.params.placeId]);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const addEvents: CustomButtonInput = {
    text: '신청',
    click: () => {
      setState('add');
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
    <div className='reservation-calendar-wrapper'>
      <div className='flex flex-row justify-center'>
        <div className='description'>
          {place.description}
        </div>
      </div>

      <FullCalendar
        plugins={[timeGridPlugin]}
        locale='UTC'
        timeZone='ko'
        nowIndicator
        dayCellContent={({date}) => date.getDate()}
        allDaySlot={false}
        weekNumbers
        weekNumberContent={(week) => `${week.num}주`}
        views={{
          timeGrid: {
            dayHeaderFormat: {
              day: 'numeric',
            },
          },
        }}
        headerToolbar={{
          start: 'title prev,next today',
          end: 'addEvents,deleteEvents',
        }}
        buttonText={{
          today: '오늘',
        }}
        fixedWeekCount={false}
        customButtons={{
          addEvents,
          deleteEvents,
        }}
        events={place.reservations}
      />
      <Dialog
        visible={visible}
        handleClose={handleClose}
        state={state}
      />
    </div>
  );
};

export default ReservationCalendar;
