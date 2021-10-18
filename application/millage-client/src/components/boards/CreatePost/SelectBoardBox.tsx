import {useBoard} from '@hooks/board';
import {RootState} from '@modules';
import {FormControl, MenuItem, Select} from '@mui/material';
import React from 'react';
import {useSelector} from 'react-redux';
import {InputContainer, InputTitle} from './InputComponents';


type Props = {
  selectedBoardId: number;
  setBoardId: React.Dispatch<React.SetStateAction<number>>;
}

const SelectBoardBox: React.FC<Props> = ({selectedBoardId, setBoardId}) => {
  const {
    boardListState: {loading, data},
  } = useBoard();

  const session = useSelector((state: RootState) => state.user.session);

  return (
    <InputContainer className='mt-6 sm:items-center' >
      <InputTitle>게시판 선택</InputTitle>
      { loading || !data ?
        <div>loading</div> :

        <div className='w-40 h-10'>
          <FormControl className='w-full h-full' >
            <Select
              color='success'
              className='h-full'
              value={selectedBoardId}
              onChange={(e) => setBoardId((e.target.value as number))}
              renderValue={(selected) => {
                if (selected === 0) {
                  return <em>선택해주세요</em>;
                }

                return data.find((b) => b.id === selected)?.title;
              }}
            >
              {data.filter((b) => {
                return session?.role.name == 'NORMAL_USER' ? b.auth == 0 : true;
              }).map( (b) =>
                <MenuItem key={b.id} value={b.id}>{b.title}</MenuItem>,
              )}
            </Select>
          </FormControl>
        </div>
      }
    </InputContainer>
  );
};

export default SelectBoardBox;
