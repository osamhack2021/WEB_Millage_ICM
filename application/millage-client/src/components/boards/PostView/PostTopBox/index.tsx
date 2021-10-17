import React, {useState} from 'react';
import {Post} from '@modules/board/types';
import NewMessage from '@components/DM/NewMessage';
import LeftArea from './LeftArea';
import RightArea from './RightArea';


type Props = Pick<Post,
  'id' | 'board' | 'postType' | 'writer' | 'createdAt' |
  'heartCount' | 'comments' | 'recruitStatus' | 'hasHearted'
>;

const PostTopBox: React.FC<Props> = (post) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div className='w-full mb-4 flex items-start justify-between'>
        {/* 좌측 영역 */}
        <LeftArea {...post} />

        {/* 우측 영역 */}
        <RightArea {...post} setOpenDialog={setOpenDialog} />
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
