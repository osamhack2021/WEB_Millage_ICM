import * as React from 'react';
import type {Place} from '@modules/Reservation/types';
import {Link} from 'react-router-dom';
import {RESERVATION_PATH} from '@constants';
import {
  Button,
  useMediaQuery,
} from '@mui/material';

interface Props {
  place: Place;
  onClick: React.MouseEventHandler<HTMLAnchorElement>
  isSelected: boolean;
}
const PlaceItem: React.FC<Props> = ({place, onClick, isSelected}) => {
  const isMobile = useMediaQuery('(max-width:640px)');

  return (
    <div className='reservation-router-anchor'>
      <Link
        to={`${RESERVATION_PATH}/${place.id}`}
        onClick={onClick}
      >
        <Button
          variant={isSelected ? 'contained' : 'outlined'}
          fullWidth={isMobile}
        >
          {place.name}
        </Button>
      </Link>
    </div>
  );
};

export default PlaceItem;
