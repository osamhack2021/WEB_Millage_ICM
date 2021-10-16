import React from 'react';
import {Add} from '@mui/icons-material';

type Props = {
  onAddPoll: React.MouseEventHandler
}

const PollBoxHeader: React.FC<Props> = ({onAddPoll}) => {
  return (
    <div className='flex items-start justify-between mb-3'>
      <h3 className='text-lg' >설문조사 선택 항목</h3>
      <button
        onClick={onAddPoll}
        className='
          px-2 py-1 focus:outline-none flex items-center text-base group
          border border-gray-300 hover:border-green-light
          transition duration-500
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
  );
};

export default PollBoxHeader;
