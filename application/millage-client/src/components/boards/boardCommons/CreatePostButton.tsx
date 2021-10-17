import React from 'react';
import {OutlinedButton} from '@components/common';
import {CREATE_POST_PATH} from '@constants';
import {CreatePostIcon} from '@images';
import {useHistory} from 'react-router';

const CreatePostButton: React.FC = () => {
  const history = useHistory();
  const onClick = () => {
    history.push(CREATE_POST_PATH);
  };
  return (
    <OutlinedButton
      onClick={onClick}
      className='px-4 py-2'
    >
      <div
        className='h-4 w-4 bg-cover mr-2'
        style={{
          backgroundImage: `url(${CreatePostIcon})`,
        }}
      />
        글 쓰기
    </OutlinedButton>
  );
};

export default CreatePostButton;
