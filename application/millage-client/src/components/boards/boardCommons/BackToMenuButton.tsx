import React from 'react';
import {OutlinedButton} from '@components/common';
import {BoardIcon} from '@images';
import {useHistory} from 'react-router';

type Props = {
  type: 'main' | 'boardView',
  id?: number;
}

const BackToMenuButton: React.FC<Props> = ({type, id}) => {
  const history = useHistory();
  const onClick = () => {
    if (id) {
      history.push(`/board/${id}`);
    } else {
      history.goBack();
    }
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
          backgroundImage: `url(${BoardIcon})`,
        }}
      />
        목록으로
    </OutlinedButton> :

    <></>
  );
};

export default BackToMenuButton;
