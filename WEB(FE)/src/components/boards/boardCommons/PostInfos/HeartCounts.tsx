import React from 'react';
import {Like} from '@images';
import {Post} from '@modules/board/types';
import {StyleOverWriteProps} from '@utils/commonTypes';

type Props = Pick<Post, 'heartCount'> & StyleOverWriteProps

const HeartCounts: React.FC<Props> = ({heartCount, className}) => {
  return (
    <div className={`${className} flex justify-start items-center`}>
      <div
        className='h-4 w-4 bg-cover mr-1'
        style={{
          marginBottom: '-2px',
          backgroundImage: `url(${Like})`,
        }}
      />
      <span>
        {heartCount}
      </span>
    </div>
  );
};

export default HeartCounts;
