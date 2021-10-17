import React from 'react';
import {useHistory} from 'react-router';
import {CREATE_POST_PATH} from '@constants';
import {OutlinedButton} from '@components/common';
import {CreatePostIcon} from '@images';

type Props = {
  title: string;
}

const BoardTitle: React.FC<Props> = ({title}) => {
  const history = useHistory();
  const onClick = () => {
    history.push(CREATE_POST_PATH);
  };
  return (
    <div
      className='
        mb-4 px-6 py-4 ring-1 ring-gray-300
        flex justify-between items-center
      '
    >
      <h1 className='text-3xl'>
        {title}
      </h1>

      {/* 글 생성 버튼 */}
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
    </div>
  );
};

export default BoardTitle;
