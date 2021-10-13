import React from 'react';
import {Post} from '@modules/board/types';

type Props = Pick<Post, 'postType' | 'writer' | 'createdAt'> ;

const PostTopBox: React.FC<Props> = (
    {postType, writer, createdAt},
) => {
  return (
    <div className='h-16 w-full bg-red-300'>
      PostHeader (
        아이콘: {postType},
        작성자: {writer.nickname},
        작성시각: {createdAt},
        쪽지 등등
      )
    </div>
  );
};

export default PostTopBox;
