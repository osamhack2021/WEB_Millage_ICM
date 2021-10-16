import * as React from 'react';
import type {Place} from '@modules/Reservation/types';
import {Link} from 'react-router-dom';
import {RESERVATION_PATH} from '@constants';

interface Props {
  place: Place;
}
const PlaceItem: React.FC<Props> = ({place}) => {
  return (
    <Link to={`${RESERVATION_PATH}/${place.id}`}>
      {place.name}
    </Link>
  );
};

export default PlaceItem;
