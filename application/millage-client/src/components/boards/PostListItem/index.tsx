import React from 'react';
import {Post} from '@modules/board/types';
import PostItemTop from './PostItemTop';
import PostContent from './PostContent';
import PostItemBottom from './PostItemBottom';

type Props = {
  post: Post;
  type: 'main' | 'boardView';
};

const PostListItem: React.FC<Props> = ({post, type}) => {
  return (
    <div
      className='border border-gray-300 p-4'
      style={{
        marginTop: '-1px',
      }}
    >
      {/* Title / createdAt */}
      <PostItemTop {...post} />

      {/* Content */}
      { type === 'boardView' &&
        <PostContent {...post} />
      }

      {/* Writer, HeartCount, Comments, PostType, Poll, Recruit */}
      <PostItemBottom {...post} />
    </div>
  );
};

export default PostListItem;
