import React, {useState} from 'react';
import {Post} from '@modules/board/types';
import NewMessage from '@components/DM/NewMessage';
import {useSelector} from 'react-redux';
import {RootState} from '@modules';
type Props = Pick<Post, 'postType' | 'writer' | 'createdAt'> ;

const PostTopBox: React.FC<Props> = (
    {postType, writer, createdAt},
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
    <div className='w-full bg-red-300 mb-4'>
      PostHeader (
        아이콘: {postType},
        작성자: {writer.nickname},
        작성시각: {createdAt},
      )
      <br />
      <button
        className='p-4 bg-white border border-gray-900'
        onClick={postMessage}
      >
        쪽지
      </button>
      <NewMessage
        open={openDialog}
        closeHandler={closeDialog}
        receiverId={writer.id}
      />
    </div>
  );
};

export default PostTopBox;
