import React from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@mui/material';

function CreateBoardPage() {
  return (
    <div
      className='max-w-screen-xl py-4 px-4 mx-auto flex flex-col items-center
      lg:px-8 lg:py-8'
      style={{minHeight: '90vh'}}
    >
      <h1 className='text-2xl' > 게시판 생성 페이지 </h1>

      <div className='mt-8 w-3/4'>
        <h3 className='text-xl mt-6 mb-2' > 게시판 제목 </h3>
        <input
          type='text'
          className='focus:outline-none border-b border-gray-500 py-2 w-full'
          placeholder='게시판 제목을 입력하세요'
        />

        <h3 className='text-xl mt-6 mb-2' > 게시판 설명 </h3>
        <input
          type='text'
          className='focus:outline-none border-b border-gray-500 py-2 w-full'
          placeholder='게시판 설명을 입력하세요'
        />

        <h3 className='text-xl mt-6 mb-2' > 게시글 작성 권한 </h3>
        <RadioGroup row aria-label="authority" name="row-radio-buttons-group">
          <FormControlLabel value="admin" control={<Radio />} label="관리자 전용" />
          <FormControlLabel value="all" control={<Radio />} label="모든 유저 허용" />
        </RadioGroup>

        <h3 className='text-xl mt-6 mb-2' > 작성자 공개 여부 </h3>
        <RadioGroup
          row aria-label="public-or-private" name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="public" control={<Radio />} label="공개"
          />
          <FormControlLabel
            value="private" control={<Radio />} label="비공개"
          />
        </RadioGroup>

        <h3 className='text-xl mt-6 mb-2' > 설문 게시글 허용 </h3>
        <RadioGroup
          row aria-label="poll-post" name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="poll-true" control={<Radio />} label="허용"
          />
          <FormControlLabel
            value="poll-false" control={<Radio />} label="비허용"
          />
        </RadioGroup>

        <h3 className='text-xl mt-6 mb-2' > 모집 게시글 허용 </h3>
        <RadioGroup
          row aria-label="recurit-post" name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="recurit-true" control={<Radio />} label="허용"
          />
          <FormControlLabel
            value="recurit-false" control={<Radio />} label="비허용"
          />
        </RadioGroup>
      </div>

    </div>
  );
}

export default CreateBoardPage;
