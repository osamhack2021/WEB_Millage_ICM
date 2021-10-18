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
  const [route, setRoute] = React.useState(0);

  const handleRoute = (id: number) => {
    setRoute(id);
  };

  return (
    <div className='reservation-router'>
      {
        placeList.map((place) => {
          return (
            <PlaceItem
              place={place}
              onClick={() => handleRoute(place.id)}
              isSelected={route === place.id}
            />
          );
        })
      }
    </div>
  );
};

export default ReservationHeader;
