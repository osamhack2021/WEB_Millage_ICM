import {useBoard} from '@hooks/board';
import {Poll, ToggleVoteReq} from '@modules/board/types';
import React from 'react';

type Props = Pick<Poll, 'content'> & ToggleVoteReq

const PollItem: React.FC<Props> = ({content, postId, pollId}) => {
  const {toggleVote} = useBoard();
  return (
    <div
      className='ring-1 ring-gray-300 p-2 cursor-pointer'
      onClick={() => toggleVote({postId, pollId})}
    >
      {content}
    </div>
  );
};

export default PollItem;
