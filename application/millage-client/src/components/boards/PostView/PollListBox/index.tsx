import React, {useState} from 'react';
import {FilledButton} from '@components/common';
import {useBoard} from '@hooks/board';
import {Post} from '@modules/board/types';
import PollItem from './PollItem';
import {useUser} from '@hooks/user';

type Props = Required<Pick<Post, 'pollItems' | 'isVoter'>> & {
  postId: number;
}

const PollListBox: React.FC<Props> = ({pollItems, isVoter, postId}) => {
  const {session} = useUser();
  const {toggleVote} = useBoard();
  const [selectedPollId, setPollId] = useState<number>(-1);

  const votedPoll = pollItems.find((poll) => {
    return JSON.stringify(poll.voters) !== '[]' &&
      poll.voters.some((voter) => voter.id === session?.id);
  });
  const votedPollId = votedPoll?.id || -1;

  const onClick = () => {
    if (isVoter) {
      setPollId(-1);
      toggleVote({postId, pollId: votedPollId});
    } else {
      if (selectedPollId === -1) {
        return;
      }
      toggleVote({postId, pollId: selectedPollId});
    }
  };

  let totalVotes: number = 0;
  pollItems.forEach((poll) => {
    totalVotes += poll.voters.length;
  });

  return (
    <div className='flex flex-col items-center mb-8' >

      {/* PollLists */}
      <div
        className='
          ring-1 ring-gray-300 mb-2 w-full
          flex flex-col divide-y divide-gray-300
        '
      >
        {pollItems.map( (poll) => (
          <PollItem
            {...poll}
            key={poll.id}
            setPollId={setPollId}
            isVoter={isVoter}
            votedPollId={votedPollId}
            selectedPollId={selectedPollId}
          />
        ))}
      </div>

      {/* 투표 인원 정보 */}
      <span
        className='self-end text-sm text-gray-500'
      >
        {totalVotes}명 참여함
      </span>

      {/* 투표하기 / 취소하기 버튼 */}
      <FilledButton
        className='w-32'
        onClick={onClick}
      >
        {isVoter ? '투표취소' : '투표하기'}
      </FilledButton>
    </div>
  );
};

export default PollListBox;
