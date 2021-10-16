import React from 'react';
import { CreatePostReq } from '@modules/board/types';
import { UseFormRegister } from 'react-hook-form';
import { InputContainer, InputTitle } from './InputComponents';

type Props = {
  register: UseFormRegister<CreatePostReq>
}

const RecruitInputBox: React.FC<Props> = ({register}) => {
  return (
    <InputContainer className='my-6' >
      <InputTitle>모집 인원</InputTitle>
      <input
        {...register('rCount')}
        className='p-2 ring-1 ring-gray-500 focus:outline-none'
        type='number'
        min={0}
      />
    </InputContainer>
  );
};

export default RecruitInputBox;
