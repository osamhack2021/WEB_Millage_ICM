import React from 'react';
import BoardItem from './BoardItem';

function BoardGrid() {
  return (
    <div
      className={`
        mt-4
        grid grid-cols-1 sm:grid-cols-2 gap-2
      `}
    >

      <BoardItem />
      <BoardItem />
      <BoardItem />
      <BoardItem />

    </div>
  );
}

export default BoardGrid;
