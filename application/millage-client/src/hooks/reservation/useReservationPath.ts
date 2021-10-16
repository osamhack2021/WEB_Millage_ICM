import {useLocation, useParams} from 'react-router';
import queryString from 'query-string';
import {usePrevious} from '@hooks';

type ReservationViewParams = {
  placeId: string;
}

const useReservationPath: () => [
  string,
  string | string[] | null,
  any,
] = () => {
  const {placeId} = useParams<ReservationViewParams>();
  const {search} = useLocation();
  const {query} = queryString.parse(search);
  const prevQuery = usePrevious(query);

  return [
    placeId,
    query,
    prevQuery,
  ];
};

export default useReservationPath;
