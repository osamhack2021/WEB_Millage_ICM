import React from 'react';
import {Add} from '@mui/icons-material';
import {OutlinedButton} from '@components/common';

type Props = {
  onAddPoll: React.MouseEventHandler
}

const PollBoxHeader: React.FC<Props> = ({onAddPoll}) => {
  return (
    <div className='flex items-start justify-between mb-3'>
      <h3 className='text-lg' >설문조사 선택 항목</h3>
      <OutlinedButton onClick={onAddPoll}>
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
      </OutlinedButton>
    </div>
  );
};

export default PollBoxHeader;
