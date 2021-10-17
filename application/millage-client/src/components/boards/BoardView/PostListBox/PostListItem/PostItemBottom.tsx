import React from 'react';
import {Post} from '@modules/board/types';

type Props = Pick<Post,
  'writer' | 'heartCount' | 'comments' |
  'postType' | 'pollItems' | 'recruitStatus'
>

const PostItemBottom: React.FC<Props> = ({
  writer, heartCount, comments,
}) => {
  return (
    <div className='mt-2 flex justify-start items-center'>

      {/* 작성자 */}
      <span className='text-sm'>
        {writer.nickname}
      </span>

      {/* 하트 */}
      <span>
        {heartCount}
      </span>

      {/* 댓글 수 */}
      <span>
        {comments.length}
      </span>

    </div>
  );
};

export default PostItemBottom;
