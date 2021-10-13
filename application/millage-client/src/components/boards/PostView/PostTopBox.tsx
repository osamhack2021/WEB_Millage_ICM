import React from 'react';
import {Post} from '@modules/board/types';

type Props = Pick<Post, 'postType' | 'writer' | 'createdAt'> ;

const PostTopBox: React.FC<Props> = (
    {postType, writer, createdAt},
) => {
  const postMessage = () => {
    console.log(writer.id);
  };
  return (
    <div className='w-full bg-red-300 mb-4'>
      PostHeader (
        아이콘: {postType},
        작성자: {writer.nickname},
        작성시각: {createdAt},
      )
      <br />
      <button
        className='p-4 bg-white border border-gray-900'
        onClick={postMessage}
      >
        쪽지
      </button>
    </div>
  );
};

export default PostTopBox;
