import React, {useState} from 'react';
import {Post} from '@modules/board/types';
import NewMessage from '@components/DM/NewMessage';
import {useSelector} from 'react-redux';
import {RootState} from '@modules';
import {UserIcon} from '@images';
import {RECRUIT} from '@constants';
import {
  CommentCounts,
  CreatedAt,
  HeartCounts,
  RecruitStatus,
  PostTypeIcon,
} from '../boardCommons/PostInfos';


type Props = Pick<Post,
  'postType' | 'writer' | 'createdAt' |
  'heartCount' | 'comments' | 'recruitStatus'
>;

const PostTopBox: React.FC<Props> = (
    {postType, writer, createdAt, heartCount, comments, recruitStatus},
) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const session = useSelector((state: RootState) => state.user.session);
  const postMessage = () => {
    if (session) {
      if (session.id != writer.id) {
        setOpenDialog(true);
      }
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div className='w-full mb-4 flex items-start justify-between'>
        {/* 좌측 영역 */}
        <div className='flex items-center'>

          {/* 프로필 이미지 */}
          <img className="smallericon mr-3" src={UserIcon} />

          {/* 상세 정보 (작성자, 작성시각, 하트, 댓글, 게시글 타입) */}
          <div className='flex flex-col'>
            {/* 작성자 */}
            <span className='text-base font-bold' >
              {writer.nickname}
            </span>

            {/* 작성자 하단 정보 (작성자, 작성시각, 하트, 댓글, 게시글 타입) */}
            <div className='flex items-center text-sm text-gray-600' >
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


        {/* 우측 영역 */}
        <div>
          <button
            className='p-4 bg-white border border-gray-900'
            onClick={postMessage}
          >
            쪽지
          </button>
        </div>
      </div>
      <NewMessage
        open={openDialog}
        closeHandler={closeDialog}
        receiverId={writer.id}
      />
    </div>
  );
};

export default PostTopBox;
