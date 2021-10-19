import * as React from 'react';
import {RootState} from '@modules';
import {
  getPlaceByIdAsync,
  createReservationAsync,
  deleteReservationAsync,
  getPlaceListAsync,
} from '@modules/Reservation/actions';
import {useDispatch, useSelector} from 'react-redux';
import type {
  CreateReservationReq,
  DeleteReservationReq,
  Place,
  PlaceState,
} from '@modules/Reservation/types';
import useReservationPath from './useReservationPath';

const useReservation: () => [
  PlaceState,
  (req: CreateReservationReq) => void,
  (req: DeleteReservationReq) => void,
  Array<Place>,
] = () => {
  const [placeId] = useReservationPath();
  const [place, setPlace] = React.useState<PlaceState>({
    id: 0,
    name: '',
    description: '',
    seats: 0,
    unitId: 0,
    reservations: [],
  });
  const [placeList, setPlaceList] = React.useState<Array<Place>>([]);
  const reservation = useSelector((state: RootState) => state.reservation);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPlaceListAsync.request());
    dispatch(getPlaceByIdAsync.request({id: placeId}));
  }, [dispatch]);
  React.useEffect(() => {
    setPlaceList(reservation.places);
    setPlace(reservation.place);
  }, [reservation]);
  const createReservation = React.useCallback((req: CreateReservationReq) => {
    dispatch(createReservationAsync.request(req));
  }, []);
  const deleteReservation = React.useCallback((req: DeleteReservationReq) => {
    dispatch(deleteReservationAsync.request(req));
  }, []);

  return [
    place,
    createReservation,
    deleteReservation,
    placeList,
  ];
};

export default useReservation;
