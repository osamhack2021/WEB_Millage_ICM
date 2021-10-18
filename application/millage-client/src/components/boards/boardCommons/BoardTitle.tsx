import React from 'react';
import {CreatePostButton, BackToMenuButton} from '.';

type Props = {
  title: string;
  id?: number;
  page?: string;
}

const BoardTitle: React.FC<Props> = ({title, id, page}) => {
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
      <div className='flex'>
        <CreatePostButton type='boardView' id={id}/>
        { page == 'postView' ?
        <BackToMenuButton type='boardView' id={id}/>:
        ''
        }
      </div>
    </div>
  );
};

export default BoardTitle;
