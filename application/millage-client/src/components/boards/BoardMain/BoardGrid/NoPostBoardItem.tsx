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

      <div className='h-48 flex justify-center items-center'>
        게시글이 아직 없습니다.
      </div>
    </div>
  );
}

export default BoardItem;
