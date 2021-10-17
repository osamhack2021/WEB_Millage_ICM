import React, {useState} from 'react';
import {Post} from '@modules/board/types';
import NewMessage from '@components/DM/NewMessage';
import {useSelector} from 'react-redux';
import {RootState} from '@modules';
import LeftArea from './LeftArea';


type Props = Pick<Post,
  'postType' | 'writer' | 'createdAt' |
  'heartCount' | 'comments' | 'recruitStatus'
>;

const PostTopBox: React.FC<Props> = (post) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const session = useSelector((state: RootState) => state.user.session);
  const postMessage = () => {
    if (session) {
      if (session.id != post.writer.id) {
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
        <LeftArea {...post} />


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
        receiverId={post.writer.id}
      />
    </div>
  );
};

export default PostTopBox;
