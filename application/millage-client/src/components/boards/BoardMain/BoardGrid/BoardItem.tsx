import React from 'react';
import PostItem from './PostItem';

function BoardItem() {
  return (
    <div className='ring-1 ring-gray-300 flex flex-col' >
      <div className='
        px-3 py-4 ring-1 ring-gray-300
        text-green text-lg font-bold
      '>
        Board Title
      </div>

      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </div>
  );
}

export default BoardItem;
