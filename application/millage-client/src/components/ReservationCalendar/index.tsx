import * as React from 'react';
import FullCalendar, {
  CustomButtonInput, EventHoveringArg,
} from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './ReservationCalendar.css';
import {useReservation} from '@hooks/reservation';
import Dialog from './Dialog';
import {useDispatch} from 'react-redux';
import {
  getPlaceByIdAsync,
  getPlaceListAsync,
} from '@modules/Reservation/actions';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';


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

  const handleMouseEnter = (e: EventHoveringArg) => {
    const ToolbarWrapper = document.createElement('div');
    const ToolbarHeader = document.createElement('p');
    const HeaderText = document.createTextNode(e.event.title);
    ToolbarHeader.classList.add('toolbar-header');
    ToolbarHeader.appendChild(HeaderText);
    ToolbarWrapper.appendChild(ToolbarHeader);
    if (e.event.extendedProps.content) {
      const ToolbarDivider = document.createElement('div');
      ToolbarDivider.classList.add('toolbar-divider');
      const ToolbarContent = document.createElement('p');
      ToolbarContent.classList.add('toolbar-content');
      const ContentText = document.createTextNode(
          e.event.extendedProps.content,
      );
      ToolbarContent.appendChild(ContentText);
      ToolbarWrapper.appendChild(ToolbarDivider);
      ToolbarWrapper.appendChild(ToolbarContent);
    }
    tippy(e.el, {
      content: ToolbarWrapper.innerHTML,
      allowHTML: true,
      animation: 'scale',
      theme: 'light',
    });
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
        nextDayThreshold='24:00:00'
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
        eventMouseEnter={handleMouseEnter}
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
