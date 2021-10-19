import React from 'react';
import {Post} from '@modules/board/types';
import {Comment} from '@images';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = Pick<Post, 'comments'> & StyleOverWriteProps

const CommentCounts: React.FC<Props> = ({comments, className}) => {
  return (
    <div className={`${className} flex justify-start items-center`}>
      <div
        className='h-4 w-4 bg-cover mr-1'
        style={{
          marginBottom: '-2px',
          backgroundImage: `url(${Comment})`,
        }}
      />
      <span>
        {comments.length}
      </span>
    </div>
  );
};

export default CommentCounts;
