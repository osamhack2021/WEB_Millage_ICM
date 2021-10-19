import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {default as Calendar} from '@components/ReservationCalendar';
import {default as Header} from '@components/ReservationHeader';
import {
  RESERVATION_VIEW_PATH,
} from '@constants';
import './reservation.css';

const Reservation: React.FC = () => {
  return (
    <div id="reservation-container">
      <Header />
      <Switch>
        <Route exact path={RESERVATION_VIEW_PATH} component={Calendar} />
      </Switch>
    </div>
  );
};

export default Reservation;
