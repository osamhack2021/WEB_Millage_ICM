import React from 'react';
import {Post} from '@modules/board/types';
import moment from 'moment';
import {
  ChatBubbleOutlineOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material';
import PostItemTop from './PostItemTop';

type Props = {
  post: Post;
};

const PostListItem: React.FC<Props> = ({post}) => {
  return (
    <div
      className='border border-gray-300 p-4'
      style={{
        marginTop: '-1px',
      }}
    >
      {/* Title / createdAt */}
      <PostItemTop {...post} />

      <p className='text-base text-gray-400' >{post.content}</p>


      <div className='flex justify-between items-center'>

        <div>
          <span className='text-sm text-gray-400'>
            {moment(post.createdAt).format('MM/DD HH:mm:ss')}
          </span>
          &nbsp;&nbsp;&nbsp;
          <span className='text-sm'>
            {post.writer.nickname}
          </span>
        </div>

        <div className='flex items-center' style={{
          fontSize: '0.875rem',
          lineHeight: '0.875rem',
        }}>
          <div className='text-red-500 flex items-center'>
            <ThumbUpOutlined className='mr-1' style={{
              fontSize: '0.875rem',
            }} />
            <span>
              {post.heartCount}
            </span>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div className='text-blue-500 flex items-center'>
            <ChatBubbleOutlineOutlined className='mr-1' style={{
              fontSize: '0.875rem',
            }} />
            <span>
              {post.comments.length}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PostListItem;
