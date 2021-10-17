import React from 'react';
import {CommentDeleteIcon, DMIcon, LikeBlackFilled, LikeComment} from '@images';
import {Post} from '@modules/board/types';
import {useUser} from '@hooks/user';
import {useBoard} from '@hooks/board';


type Props = Pick<Post, 'writer' | 'id' | 'hasHearted'> & {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

const RightArea: React.FC<Props> = ({
  id: postId, writer, hasHearted, setOpenDialog,
}) => {
  const {session} = useUser();
  const {togglePostHeart} = useBoard();

  return (
    <div>
      {/* 쪽지 버튼 */}
      <button
        className={`
          ${writer.id == session?.id ? 'hidden' : ''}
          focus:outline-none
        `}
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <img src={DMIcon}/>
      </button>

      {/* 하트 버튼 */}
      <button
        onClick={() => {
          togglePostHeart({postId});
        }}
      >
        <img src={hasHearted ? LikeBlackFilled: LikeComment}/>
      </button>

      {/* 삭제 버튼 */}
      <button
        className={`
          ${writer.id == session?.id ||
          session?.role.name == 'ADMIN' ||
          session?.role.name =='SUPER_ADMIN' ? '' : 'hidden'}
          focus:outline-none
        `}
        onClick={() => {
          if (confirm('정말로 삭제하시겠습니까?')) {
            // dispatch(deleteReplyAsync.request(id));
          }
        }}
      >
        <img src={CommentDeleteIcon}/>
      </button>
    </div>
  );
};

export default RightArea;
