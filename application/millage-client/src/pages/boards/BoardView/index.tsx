import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router';
import {useBoard} from '@hooks/board';

type BoardViewParams = {
  boardId: string;
}

function BoardViewPage() {
  const {boardId} = useParams<BoardViewParams>();
  const {curBoardState, getBoardById} = useBoard();
  useEffect(() => {
    getBoardById(+boardId);
  }, [boardId, getBoardById]);

  const {loading, data, error} = curBoardState;
  console.log(data);
  const history = useHistory();
  if (error) {
    history.replace('/');
  }

  return (
    loading ?

    <div>
      loading...
    </div>:

    <div>
      {boardId}
      Board View Page
    </div>
  );
}

export default BoardViewPage;
