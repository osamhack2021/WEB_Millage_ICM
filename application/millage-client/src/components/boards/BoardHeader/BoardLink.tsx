import React from 'react';
import {Link} from 'react-router-dom';
import {BOARD_PATH} from '@constants';

type Props = {
  id: number;
  title: string;
}

const BoardLink: React.FC<Props> = ({id, title}) => {
  return (
    <Link
      to={`${BOARD_PATH}/${id}`}
      className='text-base text-gray-600 hover:underline mx-2'
    >
      {title}
    </Link>
  );
};

export default BoardLink;
