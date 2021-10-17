import * as React from 'react';
import {useSchedule} from '@hooks/Schedule';
import FullCalendar, {
  CustomButtonInput, EventHoveringArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Dialog from './Dialog';
import './Calendar.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';

const Calendar: React.FC = () => {
  const [isShow, setIsShow] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [state, setState] = React.useState<'add' | 'edit' | 'delete'>('add');
  const [scheduleList] = useSchedule();

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  React.useEffect(() => {
    console.log(scheduleList);
  }, [scheduleList]);

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
  const toggleEvents: CustomButtonInput = {
    text: isShow ? '개인' : '전체',
    click: () => {
      setIsShow((e) => !e);
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
    <div className='calendar-wrapper'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        locale='ko'
        allDaySlot={false}
        nowIndicator
        aspectRatio={0.8}
        dayCellContent={({date}) => date.getDate()}
        views={{
          timeGrid: {
            dayHeaderFormat: {
              day: 'numeric',
            },
            dayHeaderClassNames: 'fc-time-grid-day-header',
          },
        }}
        weekNumbers
        weekNumberContent={(week) => `${week.num}주`}
        headerToolbar={{
          start: 'title prev,next today dayGridMonth,timeGridWeek',
          end: 'toggleEvents',
        }}
        footerToolbar={{
          end: 'addEvents,editEvents,deleteEvents',
        }}
        buttonText={{
          today: '오늘',
          month: '월간',
          week: '주간',
        }}
        events={scheduleList
            .filter(({groupId}) => isShow ? true : groupId === 'person')
            .map((schedule) => ({
              ...schedule,
              color: schedule.groupId === 'person' ? '#FFA000' : '#388E3C',
            }))
        }

        fixedWeekCount={false}
        eventMouseEnter={handleMouseEnter}
        customButtons={{
          addEvents,
          editEvents,
          deleteEvents,
          toggleEvents,
        }}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false,
          hour12: false,
        }}
      />
      <Dialog
        visible={visible}
        handleClose={handleClose}
        state={state}
      />
    </div>
  );
};

export default Calendar;
