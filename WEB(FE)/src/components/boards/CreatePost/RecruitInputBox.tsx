import React from 'react';
import {CreatePostReq} from '@modules/board/types';
import {UseFormRegister} from 'react-hook-form';
import {InputContainer, InputTitle} from './InputComponents';

type Props = {
  register: UseFormRegister<CreatePostReq>
}

const RecruitInputBox: React.FC<Props> = ({register}) => {
  return (
    <InputContainer className='my-6 sm:items-center' >
      <InputTitle>모집 인원</InputTitle>
      <input
        {...register('totalMember')}
        className='
          p-2 ring-1 ring-gray-300 focus:outline-none
          focus:ring-green-light transition duration-500
        '
        type='number'
        min={1}
      />
    </InputContainer>
  );
};

export default RecruitInputBox;
