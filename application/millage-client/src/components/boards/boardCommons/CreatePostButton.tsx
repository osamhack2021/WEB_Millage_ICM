import React from 'react';
import {OutlinedButton} from '@components/common';
import {CREATE_POST_PATH} from '@constants';
import {CreatePostIcon} from '@images';
import {useHistory} from 'react-router';

type Props = {
  type: 'main' | 'boardView'
  id?: number;
}

const CreatePostButton: React.FC<Props> = ({type, id}) => {
  const history = useHistory();
  const onClick = () => {
    history.push(CREATE_POST_PATH, {
      state: {
        boardId: id,
      },
    });
  };
  return (
    type === 'boardView' ?

    <OutlinedButton
      onClick={onClick}
      className='px-4 py-2 smallerFont'
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
