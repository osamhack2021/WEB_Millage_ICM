import {useLocation, useParams} from 'react-router';
import queryString from 'query-string';


type BoardViewParams = {
  boardId: string;
}

function useBoardViewPath() {
  const {boardId} = useParams<BoardViewParams>();
  const {search} = useLocation();
  const {query} = queryString.parse(search);

  return {
    boardId,
    query,
  };
}

export default useBoardViewPath;
