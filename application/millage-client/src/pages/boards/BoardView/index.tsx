import React, {useEffect} from 'react';
import {useParams} from 'react-router';
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

  console.log(curBoardState);

  return (
    <div>
      {boardId}
      Board View Page
    </div>
  );
}

export default BoardViewPage;
