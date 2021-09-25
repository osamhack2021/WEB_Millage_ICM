import React, {useEffect, useState} from 'react';
import {useBoard} from '@hooks/board';
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
} from '@mui/material';
import {NORMAL, POLL, RECRUIT} from '@constants';

type PostType =
  | typeof NORMAL
  | typeof POLL
  | typeof RECRUIT

function CreatePostPage() {
  const {curBoard, boardList, getBoardList} = useBoard();
  useEffect(() => {
    getBoardList();
  }, []);

  const [
    selectedBoardID,
    setSelectedBoardID,
  ] = useState<number>(curBoard?.id || 0);

  const selectedBoard = boardList.find((b) => b.id === selectedBoardID);

  const [postType, setPostType] = useState<PostType>(NORMAL);

  return (
    <div
      className='max-w-screen-xl py-4 px-4 mx-auto flex flex-col items-center
      lg:px-8 lg:py-8'
      style={{minHeight: '90vh'}}
    >
      <h1 className='text-2xl' > 게시글 생성하기 </h1>

      <div className='flex mt-6 w-9/12 justify-between' >
        <div className='flex' >
          <h3 className='text-xl mt-4 mb-2 mr-4' >게시판 선택</h3>
          <FormControl className='' style={{minWidth: '10rem'}}>
            <Select
              value={selectedBoardID}
              onChange={(e) => setSelectedBoardID((e.target.value as number))}
              renderValue={(selected) => {
                if (selected === 0) {
                  return <em>선택해주세요</em>;
                }

                return boardList.find((b) => b.id === selected)?.name;
              }}
            >
              {boardList.map( (b) =>
                <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>,
              )}
            </Select>
          </FormControl>
        </div>

        { (selectedBoard?.allowPoll || selectedBoard?.allowRecruit) &&
          <RadioGroup
            row
            value={postType}
            onChange={(e, v) => {
              if ( v !== NORMAL && v !== POLL && v !== RECRUIT ) return;
              setPostType(v);
            }}
          >
            <FormControlLabel
              value={NORMAL}
              control={<Radio />}
              label="일반 게시글"
            />
            { selectedBoard?.allowPoll &&
              <FormControlLabel
                value={POLL}
                control={<Radio />}
                label="설문 게시글"
              />
            }
            { selectedBoard?.allowRecruit &&
              <FormControlLabel
                value={RECRUIT}
                control={<Radio />}
                label="모집 게시글"
              />
            }
          </RadioGroup>
        }
      </div>


      <form className='mt-8 w-3/4 flex flex-col' >
        <h3 className='text-xl mt-4 mb-2' >게시글 제목</h3>
        <input
          type='text'
          className='focus:outline-none border-b border-gray-500 py-2 w-full'
        />

        <h3 className='text-xl mt-4 mb-2' >내용</h3>
        <TextareaAutosize
          placeholder="내용을 입력하세요."
          minRows={3}
          className='focus:outline-none border border-gray-500 resize-none p-4'
        />

        {/* <h3 className='text-xl mt-4 mb-2' >이미지 업로드</h3> */}
        {/* react-dropzone 사용하기 */}

        {/* <h3 className='text-xl mt-4 mb-2' >설문지 만들기</h3> */}

        {/* <h3 className='text-xl mt-4 mb-2' >모집 인원</h3> */}

        <button className='bg-gray-500 text-white self-center px-40 py-5 mt-6'>
          게시글 생성
        </button>
      </form>


    </div>
  );
}

export default CreatePostPage;
