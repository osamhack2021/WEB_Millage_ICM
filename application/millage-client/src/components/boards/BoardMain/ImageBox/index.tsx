import React from 'react';
import ImageItem from './ImageItem';
import Img1 from './images/Img1.svg';
import Img2 from './images/Img2.svg';
import Img3 from './images/Img3.svg';
import Img4 from './images/Img4.svg';

function ImageBox() {
  return (
    <div className='overflow-x-auto mb-4'>
      <div
        style={{
          minWidth: '800px',
        }}
        className='grid grid-cols-4 gap-6'
      >
        <ImageItem
          imgPath={Img1}
          title={'9월 대대 진급식'}
        />
        <ImageItem
          imgPath={Img2}
          title={'추석 맞이 차례'}
        />
        <ImageItem
          imgPath={Img3}
          title={'9월 삽겹살 데이'}
        />
        <ImageItem
          imgPath={Img4}
          title={'화랑 리그 개최'}
        />
      </div>
    </div>
  );
}

export default ImageBox;
