import React from 'react';
import {UserIcon} from '@images';
import {Post} from '@modules/board/types';
import {
  CommentCounts,
  CreatedAt,
  HeartCounts,
  PostTypeIcon,
  RecruitStatus,
} from '@components/boards/boardCommons/PostInfos';
import {RECRUIT} from '@constants';

type Props = Pick<Post,
  'writer' | 'createdAt' | 'heartCount' |
  'comments' | 'recruitStatus' | 'postType'
>

const LeftArea: React.FC<Props> = ({
  writer, createdAt, heartCount, comments, postType, recruitStatus,
}) => {
  return (
    <div className='flex items-center'>

      {/* 프로필 이미지 */}
      <img
        className="
          w-8 h-8 sm:w-10 sm:h-10 mr-3
        "
        src={UserIcon}
      />

      {/* 상세 정보 (작성자, 작성시각, 하트, 댓글, 게시글 타입) */}
      <div className='flex flex-col'>
        {/* 작성자 */}
        <span className='text-sm sm:text-base font-bold' >
          {writer.nickname}
        </span>

        {/* 작성자 하단 정보 (작성자, 작성시각, 하트, 댓글, 게시글 타입) */}
        <div className='flex items-center text-xs sm:text-sm text-gray-600' >
          {/* 작성 시각 */}
          <CreatedAt
            className='mr-2'
            createdAt={createdAt}
          />

          {/* 하트 */}
          <HeartCounts
            heartCount={heartCount}
            className='mr-2'
          />

          {/* 댓글 수 */}
          <CommentCounts
            comments={comments}
            className='mr-2'
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
      </div>
    </div>
  );
};

export default LeftArea;
