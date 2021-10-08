import React from 'react';
import BoardItem from './BoardItem';
import NoPostBoardItem from './NoPostBoardItem';

function BoardGrid() {
  return (
    <div
      className={`
        mt-4
        grid grid-cols-1 sm:grid-cols-2 gap-2
      `}
    >

      <BoardItem />
      <NoPostBoardItem />
      <NoPostBoardItem />
      <NoPostBoardItem />
      <BoardItem />
      <BoardItem />

    </div>
  );
}

export default BoardGrid;
