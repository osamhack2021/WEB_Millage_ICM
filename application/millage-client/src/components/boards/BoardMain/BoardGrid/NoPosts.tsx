import React from 'react';
import PostItem from './PostItem';

function NoPosts() {
  return (
    <div className='h-48 flex justify-center items-center'>
      게시글이 아직 없습니다.
    </div>
  );
}

export default NoPosts;
