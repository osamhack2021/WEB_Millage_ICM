import React from 'react';
import {Add, CancelOutlined} from '@mui/icons-material';
import {PollInputs} from '@modules/board/types';
import {InputContainer, InputTitle} from './InputComponents';

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
        <div className='flex items-start justify-between mb-3'>
          <h3 className='text-lg' >설문조사 선택 항목</h3>
          <button 
            onClick={onAddPoll} 
            className='
              px-2 py-1 focus:outline-none flex items-center text-base group
              border border-gray-300 hover:border-green-light transition duration-500
            '  
          >
            <Add
              className='
                text-gray-500 mr-1
                group-hover:text-green-light
              '
              style={{
                transition: 'color 500ms',
              }}
              fontSize='small'
            />
            항목 추가
          </button>
        </div>
        
        <div className='w-full'>
          { pollList.map((p) => (
            <div
              key={p.index}
              className='relative mb-2'
            >
              <div
                className='absolute right-4 top-0 bottom-0 flex items-center'
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
                className='
                  w-full focus:outline-none py-2 px-4
                  ring-1 ring-gray-300 focus:ring-green-light
                  transition duration-500
                '
                type='text'
              />
            </div>
          ))}
        </div>
      </div>
    </InputContainer>
  );
};

export default CreatePollBox;
