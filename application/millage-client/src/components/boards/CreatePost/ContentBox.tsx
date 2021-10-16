import {CreatePostReq} from '@modules/board/types';
import {TextareaAutosize} from '@mui/material';
import React from 'react';
import {UseFormRegister} from 'react-hook-form';
import {InputContainer, InputTitle} from './InputComponents';


type Props = {
  register: UseFormRegister<CreatePostReq>
}

const ContentBox: React.FC<Props> = ({register}) => {
  return (
    <InputContainer className='mt-6'>
      <InputTitle>내용</InputTitle>
      <TextareaAutosize
        {...register('content')}
        placeholder="내용을 입력하세요."
        minRows={7}
        maxRows={10}
        className='
            focus:outline-none border border-gray-300 resize-none p-2 w-full
            focus:border-green-light transition duration-500 flex-1
          '
      />
    </InputContainer>
  );
};

export default ContentBox;
