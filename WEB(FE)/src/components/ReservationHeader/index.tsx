import * as React from 'react';
import {useReservation} from '@hooks/reservation';
import PlaceItem from './PlaceItem';
import './ReservationHeader.css';
import {Grid} from '@mui/material';

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
      <Grid container spacing={2}>
        {
          placeList.map((place) => (
            <Grid item xs={12} md={4}>
              <PlaceItem
                place={place}
                onClick={() => handleRoute(place.id)}
                isSelected={route === place.id}
              />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default ReservationHeader;
