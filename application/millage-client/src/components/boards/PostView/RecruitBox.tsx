import React from 'react';
import {useBoard} from '@hooks/board';
import {RecruitStatus} from '@modules/board/types';

type Props = RecruitStatus & {
  postId: number;
}

const RecruitBox: React.FC<Props> = ({
  status, totalMember, currentMember, isMember, postId,
}) => {
  const {toggleRecruit} = useBoard();
  return (
    <div>
      {status}
      {currentMember.length}
      {totalMember}
      <button onClick={() => toggleRecruit({postId})}>
        {isMember ? '취소' : '참가'}
      </button>
    </div>
  );
};

export default RecruitBox;
