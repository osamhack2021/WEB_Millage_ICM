import {useBoard} from '@hooks/board';
import {FormControl, MenuItem, Select} from '@mui/material';
import React from 'react';

type Props = {
  selectedBoardId: number;
  setBoardId: React.Dispatch<React.SetStateAction<number>>;
}

const SelectBoardBox: React.FC<Props> = ({selectedBoardId, setBoardId}) => {
  const {
    boardListState: {loading, data},
  } = useBoard();
  return (
    <div className='flex items-center w-full mt-6' >
      <h3 className='text-lg mr-4' >게시판 선택</h3>
      { loading || !data ?
        <div>loading</div> :

        <FormControl className='' style={{minWidth: '10rem'}}>
          <Select
            value={selectedBoardId}
            onChange={(e) => setBoardId((e.target.value as number))}
            renderValue={(selected) => {
              if (selected === 0) {
                return <em>선택해주세요</em>;
              }

              return data.find((b) => b.id === selected)?.title;
            }}
          >
            {data.map( (b) =>
              <MenuItem key={b.id} value={b.id}>{b.title}</MenuItem>,
            )}
          </Select>
        </FormControl>
      }
    </div>
  );
};

export default SelectBoardBox;
