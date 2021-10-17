import React, {useState} from 'react';
import {Post} from '@modules/board/types';
import NewMessage from '@components/DM/NewMessage';
import {useSelector} from 'react-redux';
import {RootState} from '@modules';
import { Comment, Like, UserIcon } from '@images';
import { formatDateTime } from '@utils/formatDateTime';
import { PostTypeIcon } from '../boardCommons';
import { RECRUIT } from '@constants';


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
              <span className='mr-2'>
                {formatDateTime(createdAt)}
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
              <div className='flex justify-start items-center mr-2'>
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
