import React, {useEffect} from 'react';
import {useBoard} from '@hooks/board';
import BoardItem from './BoardItem';
import NoPostBoardItem from './NoPosts';

function BoardGrid() {
  const {boardListState, getBoardList} = useBoard();
  const {loading, data} = boardListState;

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    !loading && data ?

    <div
      className={`
        mt-4
        grid grid-cols-1 sm:grid-cols-2 gap-2
      `}
    >
      {data.map( (board) => (
        <BoardItem
          key={board.id}
          id={board.id}
          title={board.title}
          posts={board.posts}
        />
      ))}

    </div> :

    <div>
      loading...
    </div>
  );
}

export default BoardGrid;
