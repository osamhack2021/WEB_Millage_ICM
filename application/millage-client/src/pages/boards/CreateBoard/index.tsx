import React, {useState} from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FALSE, TRUE} from '@constants';

type Inputs = {
  title: string;
  description: string;
}

enum UserRole {     // eslint-disable-line
  Admin = 'Admin',  // eslint-disable-line
  All = 'All'       // eslint-disable-line
}

type Authority = UserRole.Admin | UserRole.All;
type BooleanString = typeof TRUE | typeof FALSE

type CreateBoardInput = Inputs & {
  authority: Authority;
  isPublicWriter: boolean;
  allowPoll: boolean;
  allowRecruit: boolean;
  allowImage: boolean;
}

function CreateBoardPage() {
  const {register, handleSubmit} = useForm<Inputs>();
  const [authority, setAuthority] = useState<Authority>(UserRole.Admin);
  const [isPublicWriter, setIsPublicWriter] = useState<BooleanString>(TRUE);
  const [allowPoll, setAllowPoll] = useState<BooleanString>(TRUE);
  const [allowRecruit, setAllowRecruit] = useState<BooleanString>(TRUE);
  const [allowImage, setAllowImage] = useState<BooleanString>(TRUE);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const CreateBoardInput: CreateBoardInput = {
      ...data,
      authority,
      isPublicWriter: isPublicWriter === TRUE,
      allowPoll: allowPoll === TRUE,
      allowRecruit: allowRecruit === TRUE,
      allowImage: allowImage === TRUE,
    };
    console.log(CreateBoardInput);
  };

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
          value={authority}
          onChange={(e, v) => {
            if ( v !== UserRole.Admin && v !== UserRole.All ) return;
            setAuthority(v);
          }}
        >
          <FormControlLabel
            value={UserRole.Admin}
            control={<Radio />}
            label="관리자 전용"
          />
          <FormControlLabel
            value={UserRole.All}
            control={<Radio />}
            label="모든 유저 허용"
          />
        </RadioGroup>

        <h3 className='text-xl mt-4 mb-2' > 작성자 공개 여부 </h3>
        <RadioGroup
          row
          value={isPublicWriter}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setIsPublicWriter(v);
          }}
        >
          <FormControlLabel value={TRUE} control={<Radio />} label="공개" />
          <FormControlLabel value={FALSE} control={<Radio />} label="비공개" />
        </RadioGroup>

        <h3 className='text-xl mt-4 mb-2' > 설문 게시글 허용 </h3>
        <RadioGroup
          row
          value={allowPoll}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setAllowPoll(v);
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
          value={allowRecruit}
          onChange={(e, v) => {
            if (v !== TRUE && v !== FALSE) return;
            setAllowRecruit(v);
          }}
        >
          <FormControlLabel
            value={TRUE} control={<Radio />} label="허용"
          />
          <FormControlLabel
            value={FALSE} control={<Radio />} label="비허용"
          />
        </RadioGroup>

        <h3 className='text-xl mt-6 mb-2' > 게시글 이미지 업로드 허용 </h3>
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
        </RadioGroup>

        <button className='bg-gray-500 text-white self-center px-40 py-5' >
          게시판 생성
        </button>
      </form>

    </div>
  );
}

export default CreateBoardPage;
