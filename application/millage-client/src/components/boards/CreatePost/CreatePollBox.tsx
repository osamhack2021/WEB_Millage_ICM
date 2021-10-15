import React from 'react';
import {CancelOutlined} from '@mui/icons-material';
import {PollInputs} from '@modules/board/types';

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
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl mt-4 mb-2' >설문지 만들기</h3>
        <button onClick={onAddPoll} >항목 추가</button>
      </div>
      <div className='w-full'>
        { pollList.map((p) => (
          <div
            key={p.index}
            className='relative ring-1 ring-gray-500'
          >
            <div
              className='
                absolute right-4 top-0 bottom-0 flex items-center
              '
            >
              <CancelOutlined
                className='cursor-pointer text-red-400'
                fontSize='small'
                onClick={onDeletePoll}
              />
            </div>
            <input
              id={p.index.toString()}
              value={p.content}
              onChange={onChangePoll}
              className='w-full focus:outline-none p-4'
              type='text'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePollBox;
