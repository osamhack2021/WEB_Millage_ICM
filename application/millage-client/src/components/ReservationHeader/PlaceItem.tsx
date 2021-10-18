import * as React from 'react';
import type {Place} from '@modules/Reservation/types';
import {Link} from 'react-router-dom';
import {RESERVATION_PATH} from '@constants';
import {Button} from '@mui/material';

interface Props {
  place: Place;
  onClick: React.MouseEventHandler<HTMLAnchorElement>
  isSelected: boolean;
}
const PlaceItem: React.FC<Props> = ({place, onClick, isSelected}) => {
  return (
    <Link
      to={`${RESERVATION_PATH}/${place.id}`}
      onClick={onClick}
    >
      <Button variant={isSelected ? 'contained' : 'outlined'}>
        {place.name}
      </Button>
    </Link>
  );
};

export default PlaceItem;
