import React from 'react';
import {PollInputs} from '@modules/board/types';
import {InputContainer, InputTitle} from '../InputComponents';
import PollBoxHeader from './PollBoxHeader';
import PollInputItem from './PollInputItem';

type Props = {
  pollList: PollInputs[],
  setPollList: React.Dispatch<React.SetStateAction<PollInputs[]>>,
}

let newPollID = 1;

const CreatePollBox: React.FC<Props> = ({
  pollList, setPollList,
}) => {
  const onAddPoll = (e: React.MouseEvent) => {
    e.preventDefault();
    setPollList((pollList) => [
      ...pollList,
      {
        index: ++newPollID,
        content: '',
      },
    ]);
  };

  const onChangePoll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetPollIdx = pollList.findIndex(
        (p) => p.index === +e.target.id,
    );
    const updatedPollList: PollInputs[] = [
      ...pollList.slice(0, targetPollIdx),
      {
        index: +e.target.id,
        content: e.target.value,
      },
      ...pollList.slice(targetPollIdx + 1),
    ];

    setPollList([...updatedPollList]);
  };

  const onDeletePoll = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const inputId =
      e.currentTarget.parentElement?.parentElement?.lastElementChild?.id;
    if (!inputId) {
      return;
    }
    const targetPollIdx = pollList.findIndex((p) => p.index === +inputId);
    if (targetPollIdx === undefined) {
      return;
    }
    if (pollList.length === 1) {
      setPollList([]);
    }
    setPollList([
      ...pollList.slice(0, targetPollIdx),
      ...pollList.slice(targetPollIdx + 1),
    ]);
  };

  return (
    <InputContainer className='mt-6'>
      <InputTitle>설문 조사</InputTitle>
      <div className='max-w-md w-full flex flex-col'>
        <PollBoxHeader onAddPoll={onAddPoll} />

        <div className='w-full'>
          { pollList.map((p) => (
            <PollInputItem
              key={p.index}
              onDeletePoll={onDeletePoll}
              onChangePoll={onChangePoll}
              {...p}
            />
          ))}
        </div>
      </div>
    </InputContainer>
  );
};

export default CreatePollBox;
