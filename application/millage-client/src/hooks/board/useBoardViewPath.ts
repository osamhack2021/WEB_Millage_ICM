import {useLocation, useParams} from 'react-router';
import queryString from 'query-string';
import {usePrevious} from '@hooks';


type BoardViewParams = {
  boardId: string;
}

function useBoardViewPath() {
  const {boardId} = useParams<BoardViewParams>();
  const {search} = useLocation();
  const {query} = queryString.parse(search);
  const prevQuery = usePrevious(query);

  return {
    boardId,
    query,
    prevQuery,
  };
}

export default useBoardViewPath;
