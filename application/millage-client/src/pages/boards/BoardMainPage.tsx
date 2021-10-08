import React from 'react';

function BoardMainPage() {
  return (
    <div>
      <div className='bg-gray-800 h-40 w-full'>
        공모전 포스터 이미지 들어갈 예정
      </div>

      <div
        className={`
          mt-4
          grid grid-cols-1 sm:grid-cols-2 gap-2
        `}
      >
        <div className='ring-1 ring-gray-300 flex flex-col' >
          <div className='
            px-3 py-4 ring-1 ring-gray-300
            text-green text-lg font-bold
          '>
            Board Title
          </div>

          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>

        </div>
        <div className='ring-1 ring-gray-300 flex flex-col' >
          <div className='
            px-3 py-4 ring-1 ring-gray-300
            text-green text-lg font-bold
          '>
            Board Title
          </div>

          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>

        </div>
        <div className='ring-1 ring-gray-300 flex flex-col' >
          <div className='
            px-3 py-4 ring-1 ring-gray-300
            text-green text-lg font-bold
          '>
            Board Title
          </div>

          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>

        </div>
        <div className='ring-1 ring-gray-300 flex flex-col' >
          <div className='
            px-3 py-4 ring-1 ring-gray-300
            text-green text-lg font-bold
          '>
            Board Title
          </div>

          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>
          <div className='p-3 border-t border-gray-300'>
            Board Item
          </div>

        </div>
      </div>

    </div>
  );
}


export default BoardMainPage;
