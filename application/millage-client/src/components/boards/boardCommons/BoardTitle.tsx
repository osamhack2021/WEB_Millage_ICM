import React from 'react';
import {CreatePostButton} from '.';

type Props = {
  title: string;
}

const BoardTitle: React.FC<Props> = ({title}) => {
  return (
    <div
      className='
        mb-4 px-6 py-4 ring-1 ring-gray-300
        flex justify-between items-center
      '
    >
      <h1 className='text-3xl'>
        {title}
      </h1>

      {/* 글 생성 버튼 */}
      <CreatePostButton />
    </div>
  );
};

export default BoardTitle;
