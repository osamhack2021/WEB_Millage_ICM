import {PollInputs} from '@modules/board/types';
import {CancelOutlined} from '@mui/icons-material';
import React from 'react';

type Props = PollInputs & {
  onDeletePoll: React.MouseEventHandler;
  onChangePoll: React.ChangeEventHandler;
}

const PollInputItem: React.FC<Props> = ({
  onDeletePoll, onChangePoll, index, content,
}) => {
  return (
    <div className='relative mb-2'>
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
        id={index.toString()}
        value={content}
        onChange={onChangePoll}
        className='
          w-full focus:outline-none py-2 px-4
          ring-1 ring-gray-300 focus:ring-green-light
          transition duration-500
        '
        type='text'
      />
    </div>
  );
};

export default PollInputItem;
