import React from 'react';
import {CreatePostButton} from '.';

type Props = {
  title: string;
}

const BoardTitle: React.FC<Props> = ({title}) => {
  return (
    <div
      className='
        mb-4 p-3 sm:px-6 sm:py-4 ring-1 ring-gray-300
        flex justify-between items-center
      '
    >
      <h1 className='text-xl sm:text-3xl break-all'>
        {title}
      </h1>

      {/* 글 생성 버튼 */}
      <CreatePostButton type='boardView' />
    </div>
  );
};

export default BoardTitle;
