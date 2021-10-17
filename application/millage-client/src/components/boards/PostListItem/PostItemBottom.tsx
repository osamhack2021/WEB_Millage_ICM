import React from 'react';
import {Post} from '@modules/board/types';
import {Comment, Like} from '@images';
import PostTypeIcon from '@components/boards/PostTypeIcon';
import {RECRUIT} from '@constants';

type Props = Pick<Post,
  'writer' | 'heartCount' | 'comments' |
  'postType' | 'recruitStatus'
> & {
  type: 'main' | 'boardView';
}

const PostItemBottom: React.FC<Props> = ({
  writer, heartCount, comments, postType, recruitStatus, type,
}) => {
  return (
    <div
      className={`
        ${type === 'main' ? 'mt-2' : 'mt-4'}
        flex justify-start items-center
        text-sm text-gray-600 cursor-default
      `}
      style={{
        lineHeight: '0.875rem',
      }}
    >

      {/* 작성자 */}
      <span className='mr-4'>
        {writer.nickname}
      </span>

      {/* 하트 */}
      <div className='flex justify-start items-center mr-2'>
        <div
          className='h-4 w-4 bg-cover mr-1'
          style={{
            marginBottom: '-2px',
            backgroundImage: `url(${Like})`,
          }}
        />
        <span>
          {heartCount}
        </span>
      </div>

      {/* 댓글 수 */}
      <div className='flex justify-start items-center mr-4'>
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

      {/* 게시글 타입 */}
      <PostTypeIcon
        className='mr-2'
        postType={postType}
      />

      {/* Recruit Status */}
      { postType === RECRUIT && recruitStatus &&
        <span>
          {recruitStatus.currentMember.length}명
          /&nbsp;
          {recruitStatus.totalMember}명
        </span>
      }

    </div>
  );
};

export default PostItemBottom;
