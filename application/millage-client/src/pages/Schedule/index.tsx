import * as React from 'react';
import Calendar from '@components/Calendar';
import './schedule.css';

const Schedule: React.FC = () => {
  return (
    <div id="schedule-container">
      <Calendar />
    </div>
  );
};

export default Schedule;
