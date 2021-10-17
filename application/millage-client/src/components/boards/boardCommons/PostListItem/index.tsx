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
    <div className='p-4' >
      {/* Title / createdAt */}
      <PostItemTop {...post} type={type} />

      {/* Content */}
      { type === 'boardView' &&
        <PostContent {...post} />
      }

      {/* Writer, HeartCount, Comments, PostType, Poll, Recruit */}
      <PostItemBottom {...post} type={type} />
    </div>
  );
};

export default PostListItem;
