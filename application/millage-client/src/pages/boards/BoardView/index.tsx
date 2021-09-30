import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import {useBoard} from '@hooks/board';

type BoardViewParams = {
  boardId: string;
}

function BoardViewPage() {
  const {boardId} = useParams<BoardViewParams>();
  const {curBoard, getBoardById} = useBoard();
  useEffect(() => {
    getBoardById(+boardId);
  }, [boardId, getBoardById]);

  console.log(curBoard);

  return (
    <div>
      {boardId}
      Board View Page
    </div>
  );
}

export default BoardViewPage;
