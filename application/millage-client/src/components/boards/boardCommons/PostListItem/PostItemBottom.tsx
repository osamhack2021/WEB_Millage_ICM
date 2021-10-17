import React from 'react';
import {Post} from '@modules/board/types';
import {
  CommentCounts,
  HeartCounts,
  PostTypeIcon,
  RecruitStatus,
} from '@components/boards/boardCommons/PostInfos';
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
      <HeartCounts
        heartCount={heartCount}
        className='m-2'
      />

      {/* 댓글 수 */}
      <CommentCounts
        comments={comments}
        className='mr-4'
      />

      {/* 게시글 타입 */}
      <PostTypeIcon
        className='mr-2'
        postType={postType}
      />

      {/* Recruit Status */}
      { postType === RECRUIT && recruitStatus &&
        <RecruitStatus
          recruitStatus={recruitStatus}
        />
      }

    </div>
  );
};

export default PostItemBottom;
