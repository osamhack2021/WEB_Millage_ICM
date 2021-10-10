import React from 'react';

type Props = {
  title: string;
}

const BoardTitle: React.FC<Props> = ({title}) => {
  return (
    <h1 className='text-3xl mb-4 p-6 ring-1 ring-gray-300'>
      {title}
    </h1>
  );
};

export default BoardTitle;
