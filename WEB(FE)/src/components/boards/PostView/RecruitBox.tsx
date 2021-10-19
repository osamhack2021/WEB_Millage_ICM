import React from 'react';
import {useBoard} from '@hooks/board';
import {RecruitStatus} from '@modules/board/types';
import {FilledButton} from '@components/common';

type Props = RecruitStatus & {
  postId: number;
}

const RecruitBox: React.FC<Props> = ({
  isMember, postId,
}) => {
  const {toggleRecruit} = useBoard();
  return (
    <div className='w-full flex flex-col items-center mb-8'>
      <FilledButton
        className='w-32'
        onClick={() => toggleRecruit({postId})}
      >
        {isMember ? '참가취소' : '참가신청'}
      </FilledButton>
    </div>
  );
};

export default RecruitBox;
