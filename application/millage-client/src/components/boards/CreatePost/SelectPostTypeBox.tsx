import React from 'react';
import {FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {InputContainer, InputTitle} from './InputComponents';
import {Board, PostType} from '@modules/board/types';
import {NORMAL, POLL, RECRUIT} from '@constants';

type Props = {
  postType: PostType;
  setPostType: React.Dispatch<React.SetStateAction<PostType>>;
  selectedBoard: Board;
}

const SelectPostTypeBox: React.FC<Props> = ({
  postType, setPostType, selectedBoard,
}) => {
  return (
    <InputContainer className='mt-6' >
      <InputTitle>게시판 종류</InputTitle>

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
          control={<Radio color='success' />}
          label="일반 게시글"
        />
        { selectedBoard?.pollAllowed &&
            <FormControlLabel
              value={POLL}
              control={<Radio color='success' />}
              label="설문 게시글"
            />
        }
        { selectedBoard?.recruitAllowed &&
            <FormControlLabel
              value={RECRUIT}
              control={<Radio color='success' />}
              label="모집 게시글"
            />
        }
      </RadioGroup>
    </InputContainer>
  );
};

export default SelectPostTypeBox;
