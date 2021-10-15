import React, {useEffect, useState} from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {BOARD_PATH, FALSE, TRUE} from '@constants';
import {AuthType, CreateBoardReq} from '@modules/board/types';
import {useUser} from '@hooks/user';
import {useBoard} from '@hooks/board';
import {useHistory} from 'react-router';

type Inputs = Pick<CreateBoardReq, 'title' | 'description'>

type BooleanString = typeof TRUE | typeof FALSE

function CreateBoardPage() {
  const {register, handleSubmit} = useForm<Inputs>();
  const [auth, setAuth] = useState<AuthType>(AuthType.ALL);
  const [anonymous, setAnonymous] = useState<BooleanString>(TRUE);
  const [pollAllowed, setPollAllowed] = useState<BooleanString>(TRUE);
  const [recruitAllowed, setRecruitAllowed] = useState<BooleanString>(TRUE);
  const {session} = useUser();
  const {
    createBoardState: {loading, data},
    createBoard,
    initCreateBoardState,
  } = useBoard();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (loading) {
      return;
    }
    const createBoardReq: CreateBoardReq = {
      ...data,
      auth,
      anonymous: anonymous === TRUE,
      pollAllowed: pollAllowed === TRUE,
      recruitAllowed: recruitAllowed === TRUE,
      unitId: session?.unit.id || 0,
    };
    console.log(createBoardReq);
    createBoard(createBoardReq);
  };

  const history = useHistory();
  if (data) {
    history.push(`${BOARD_PATH}/${data.id}`);
  }
  useEffect(() => {
    return () => {
      initCreateBoardState();
    };
  }, []);

  return (
    <div
      className='max-w-screen-xl py-4 px-4 mx-auto flex flex-col items-center
      lg:px-8 lg:py-8'
      style={{minHeight: '90vh'}}
    >
      <h1 className='text-2xl' > 게시판 생성 페이지 </h1>

      <form
        className='mt-8 w-3/4 flex flex-col'
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className='text-xl mt-4 mb-2' > 게시판 제목 </h3>
        <input
          {...register('title', {required: 'Title is Required'})}
          className='focus:outline-none border-b border-gray-500 py-2 w-full'
          placeholder='게시판 제목을 입력하세요'
        />

        <h3 className='text-xl mt-4 mb-2' > 게시판 설명 </h3>
        <input
          {...register('description', {required: 'Description is Required'})}
          className='focus:outline-none border-b border-gray-500 py-2 w-full'
          placeholder='게시판 설명을 입력하세요'
        />

        <h3 className='text-xl mt-4 mb-2' > 게시글 작성 권한 </h3>
        <RadioGroup
          row
          value={auth}
          onChange={(e, v) => {
            setAuth(+v);
          }}
        >
          <FormControlLabel
            value={AuthType.ADMIN}
            control={<Radio />}
            label="관리자 전용"
          />
          <FormControlLabel
            value={AuthType.ALL}
            control={<Radio />}
            label="모든 유저 허용"
          />
        </RadioGroup>

        <h3 className='text-xl mt-4 mb-2' > 작성자 공개 여부 </h3>
        <RadioGroup
          row
          value={anonymous}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setAnonymous(v);
          }}
        >
          <FormControlLabel value={TRUE} control={<Radio />} label="공개" />
          <FormControlLabel value={FALSE} control={<Radio />} label="비공개" />
        </RadioGroup>

        <h3 className='text-xl mt-4 mb-2' > 설문 게시글 허용 </h3>
        <RadioGroup
          row
          value={pollAllowed}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setPollAllowed(v);
          }}
        >
          <FormControlLabel
            value={TRUE} control={<Radio />} label="허용"
          />
          <FormControlLabel
            value={FALSE} control={<Radio />} label="비허용"
          />
        </RadioGroup>

        <h3 className='text-xl mt-4 mb-2' > 모집 게시글 허용 </h3>
        <RadioGroup
          row
          value={recruitAllowed}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setRecruitAllowed(v);
          }}
        >
          <FormControlLabel
            value={TRUE} control={<Radio />} label="허용"
          />
          <FormControlLabel
            value={FALSE} control={<Radio />} label="비허용"
          />
        </RadioGroup>

        {/* <h3 className='text-xl mt-6 mb-2' > 게시글 이미지 업로드 허용 </h3>
        <RadioGroup
          row
          value={allowImage}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setAllowImage(v);
          }}
        >
          <FormControlLabel
            value={TRUE} control={<Radio />} label="허용"
          />
          <FormControlLabel
            value={FALSE} control={<Radio />} label="비허용"
          />
        </RadioGroup> */}

        <button className='bg-gray-500 text-white self-center px-40 py-5' >
          {loading ? 'loading' : '게시판 생성'}
        </button>
      </form>

    </div>
  );
}

export default CreateBoardPage;
