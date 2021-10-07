import React, {useEffect} from 'react';
import {XLayout} from '@components/common';
import {useBoard} from '@hooks/board';

function BoardHeader() {
  const {getBoardList} = useBoard();

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div className='bg-gray-300 py-4'>
      <XLayout>
        Board Header
      </XLayout>
    </div>
  );
}

export default BoardHeader;
