import {Post} from '@modules/board/types';
import {StyleOverWriteProps} from '@utils/commonTypes';
import {formatDateTime} from '@utils/formatDateTime';
import React from 'react';

type Props = Pick<Post, 'createdAt'> & StyleOverWriteProps

const CreatedAt: React.FC<Props> = ({createdAt, className}) => {
  return (
    <span className={`${className}`} >
      {formatDateTime(createdAt)}
    </span>
  );
};

export default CreatedAt;
