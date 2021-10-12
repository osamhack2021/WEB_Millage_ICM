import * as React from 'react';
import ReservationCalendar from '@components/ReservationCalendar';
import './reservation.css';

const Reservation: React.FC = () => {
  return (
    <div id="reservation-container">
      <ReservationCalendar />
    </div>
  );
};

export default Reservation;
