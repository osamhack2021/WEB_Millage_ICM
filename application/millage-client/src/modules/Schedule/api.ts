import {Schedules} from './types';

export async function apiGetScheduleList() : Promise<Schedules> {
  const response : Schedules = {
    schedules: [
      {
        id: '1',
        groupId: '1',
        title: 'All Day Event',
        content: 'All Day event',
        start: new Date('2021-10-01'),
      },
      {
        id: '2',
        groupId: '1',
        title: 'Long Event',
        content: 'Long Event',
        start: new Date('2021-10-07'),
        end: new Date('2021-10-10'),
        color: 'purple'
      },
      {
        id: '3',
        groupId: '1',
        title: 'Repeating Event',
        content: 'Repeating Event',
        start: new Date('2021-10-09T16:00:00'),
      },
      {
        id: '4',
        groupId: '1',
        title: 'Repeating Event',
        content: 'Repeating Event',
        start: new Date('2021-10-16T16:00:00'),
      },
      {
        id: '5',
        groupId: '6',
        title: 'Conference',
        content: 'Conference',
        start: new Date('2021-10-11'),
        end: new Date('2021-10-13'),
        color: 'purple',
      },
      {
        id: '6',
        groupId: '1',
        title: 'Meeting',
        content: 'Meeting',
        start: new Date('2021-10-12T10:30:00'),
        end: new Date('2021-10-12T12:30:00'),
      },
      {
        id: '7',
        groupId: '2',
        title: 'Lunch',
        content: 'Lunch',
        start: new Date('2021-10-12T12:00:00'),
      },
      {
        id: '8',
        groupId: '2',
        title: 'Meeting',
        content: 'Meeting',
        start: new Date('2021-10-12T14:30:00'),
      },
      {
        id: '9',
        groupId: '2',
        title: 'Birthday Party',
        content: 'Birthday Party',
        start: new Date('2021-10-13T07:00:00'),
      },
      {
        id: '10',
        groupId: '2',
        title: 'Click for Google',
        content: 'Click for Google',
        start: new Date('2021-10-28'),
      },
    ],
  };

  return response;
}
