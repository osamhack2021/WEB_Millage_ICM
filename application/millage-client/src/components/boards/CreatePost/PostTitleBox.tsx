import {CreatePostReq} from '@modules/board/types';
import React from 'react';
import {UseFormRegister} from 'react-hook-form';
import {InputContainer, InputTitle} from './InputComponents';


type Props = {
  register: UseFormRegister<CreatePostReq>
}

const PostTitleBox: React.FC<Props> = ({register}) => {
  return (
    <InputContainer className='mt-6 sm:items-center'>
      <InputTitle>제목</InputTitle>
      <input
        {...register('title', {
          required: '제목을 입력해주세요',
        })}
        type='text'
        className='
          focus:outline-none border-b border-gray-300 p-2 w-full
          focus:border-green-light transition duration-500
        '
      />
    </InputContainer>
  );
};

export default PostTitleBox;
