import React from 'react';
import {Poll, Post} from '@modules/board/types';

type Props =
  Pick<Post, 'isVoter'> &
  Pick<Poll, 'content' | 'voters' | 'id'> & {
    setPollId: React.Dispatch<React.SetStateAction<number>>;
    votedPollId: number;
    selectedPollId: number;
  }

const PollItem: React.FC<Props> = ({
  id: pollId, content, voters, isVoter,
  setPollId, votedPollId, selectedPollId,
}) => {
  const isVoted     = pollId === votedPollId;
  const isSelected  = pollId === selectedPollId;
  return (
    <div
      className={`
        p-2 flex justify-between
        ${isVoter ?
        `cursor-default text-gray-500 
          ${isVoted ?
            `bg-gray-300` :
            `bg-gray-200`}` :

        `cursor-pointer text-gray-700
          ${isSelected ?
            `bg-gray-200` :
            `bg-gray-100 hover:bg-gray-200`}
        `}
      `}
      onClick={() => setPollId(pollId)}
    >
      <span>{content}</span>
      {isVoter &&
        <span>{voters.length}명</span>
      }
    </div>
  );
};

export default PollItem;
