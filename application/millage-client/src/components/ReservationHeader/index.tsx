import * as React from 'react';
import {useReservation} from '@hooks/reservation';
import PlaceItem from './PlaceItem';

const ReservationHeader: React.FC = () => {
  const [
    _a,
    _b,
    _c,
    placeList,
  ] = useReservation();

  return (
    <div className='reservation-router'>
      {
        placeList.map((place) => {
          return (
            <PlaceItem
              place={place}
            />
          );
        })
      }
    </div>
  );
};

export default ReservationHeader;
