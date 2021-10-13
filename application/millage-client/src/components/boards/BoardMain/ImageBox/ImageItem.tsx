import React from 'react';

type Props = {
  title: string;
  imgPath: string;
}

const ImageItem: React.FC<Props> = ({title, imgPath}) => {
  console.log(imgPath);
  return (
    <div className='flex flex-col items-center' >
      <div
        style={{
          backgroundImage: `url(${imgPath})`,
        }}
        className=' w-full h-32 rounded-md'
      />
      <h4 className='mt-2 text-sm'>
        {title}
      </h4>
    </div>
  );
};

export default ImageItem;
