import React from 'react';
import {OutlinedButton} from '@components/common';
import {CREATE_POST_PATH} from '@constants';
import {CreatePostIcon} from '@images';
import {useHistory} from 'react-router';

type Props = {
  type: 'main' | 'boardView'
}

const CreatePostButton: React.FC<Props> = ({type}) => {
  const history = useHistory();
  const onClick = () => {
    history.push(CREATE_POST_PATH);
  };
  return (
    type === 'boardView' ?

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
    </OutlinedButton> :

    <button onClick={onClick}>
      <div
        className='h-6 w-6 bg-cover mr-2'
        style={{
          backgroundImage: `url(${CreatePostIcon})`,
        }}
      />
    </button>
  );
};

export default CreatePostButton;