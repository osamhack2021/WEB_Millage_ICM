import {useEffect, useRef, useState} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBoardListAsync,
  updateBoardAsync,
  deleteBoardAsync,
} from '@modules/Admin/actions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddBoard from './AddBoard';

import {BoardUpdateData} from '@modules/Admin/types';
interface OptionType {
  value: string;
  label: string;
};

export default function AdminBoards() {
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const adminState = useSelector((state: any) => state.admin);
  const authResult = useSelector((state: any) => state.admin.result);
  const [boards, setBoards] = useState([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };


  useEffect(()=>{
    dispatch(getBoardListAsync.request());
  }, []);

  useEffect(() => {
    setBoards(adminState.boards);
  }, [adminState.boards]);

  useEffect(() => {
    if (authResult=== 'updateBoardSuccess') {
      alert('정상적으로 수정되었습니다');
    } else if (authResult === 'updateBoardFail') {
      alert('수정에 실패하였습니다.');
    } else if (authResult === 'insertBoardSuccess') {
      alert('정상적으로 게시판을 추가하였습니다.');
    } else if (authResult === 'insertBoardFail') {
      alert('게시판 추가에 실패하였습니다.');
    } else if (authResult === 'deleteBoardSuccess') {
      alert('게시판을 삭제하였습니다.');
    } else if (authResult === 'deleteBoardFail') {
      alert('게시판 삭제에 실패하였습니다.');
    }
  }, [authResult]);

  const updateBoard = (data: GridValueGetterParams) => {
    const board : BoardUpdateData = {
      id: data.row.id,
      title: data.row.title,
      description: data.row.description,
      pollAllowed: data.row.pollAllowed,
      recruitAllowed: data.row.recruitAllowed,
      imageAllowed: data.row.imageAllowed,
      auth: data.row.auth,
    };
    if (confirm('정말 이대로 수정하시겠습니까?')) {
      dispatch(updateBoardAsync.request(board));
    }
  };

  const deleteBoard = (id: number) => {
    if (confirm('정말 해당 게시판을 삭제하시겠습니까?')) {
      dispatch(deleteBoardAsync.request(id));
    }
  };

  const [keyword, setKeyword] = useState('');

  const columns = useRef<GridColDef[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'title',
      headerName: '게시판 명',
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'description',
      headerName: '설명',
      minWidth: 150,
      editable: true,
      flex: 1,
    },
    {
      field: 'pollAllowed',
      headerName: '설문 가능',
      headerAlign: 'center',
      minWidth: 100,
      flex: 1,
      editable: true,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <Select variant="standard"
              className="select"
              defaultValue={params.row.pollAllowed ? 1 : 0}
              onChange={(event) => {
                params.row.pollAllowed =
                  event.target.value == 1 ? true : false;
              }}
            >
              <MenuItem value={1}>가능</MenuItem>
              <MenuItem value={0}>불가능</MenuItem>
            </Select>
          </>
        );
      },
    },
    {
      field: 'recruitAllowed',
      headerName: '모집 가능',
      headerAlign: 'center',
      minWidth: 100,
      flex: 1,
      editable: true,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <Select variant="standard"
              className="select"
              defaultValue={params.row.recruitAllowed ? 1 : 0}
              onChange={(event) => {
                params.row.recruitAllowed =
                  event.target.value == 1 ? true : false;
              }}
            >
              <MenuItem value={1}>가능</MenuItem>
              <MenuItem value={0}>불가능</MenuItem>
            </Select>
          </>
        );
      },
    },
    {
      field: 'imageAllowed',
      headerName: '이미지 가능',
      headerAlign: 'center',
      minWidth: 100,
      flex: 1,
      editable: true,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <Select variant="standard"
              className="select"
              defaultValue={params.row.imageAllowed ? 1 : 0}
              onChange={(event) => {
                params.row.imageAllowed =
                  event.target.value == 1 ? true : false;
              }}
            >
              <MenuItem value={1}>가능</MenuItem>
              <MenuItem value={0}>불가능</MenuItem>
            </Select>
          </>
        );
      },
    },
    {
      field: 'auth',
      headerName: '글쓰기 권한',
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.auth}`;
      },
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <Select variant="standard"
              className="select"
              defaultValue={params.row.auth}
              onChange={(event) => {
                params.row.auth = event.target.value;
              }}
            >
              <MenuItem value={1}>관리자만</MenuItem>
              <MenuItem value={0}>아무나</MenuItem>
            </Select>
          </>
        );
      },
    },
    {
      field: 'update',
      headerName: '수정',
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Button
            variant="contained"
            color="primary"
            className="actionButton"
            onClick={
              (event) => {
                updateBoard(params);
              }
            }
          >
            수정
          </Button>
        );
      },
    },
    {
      field: 'delete',
      headerName: '삭제',
      headerAlign: 'center',
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Button
            variant="contained"
            color="error"
            className="actionButton"
            onClick={
              (event) => {
                deleteBoard(+params.row.id);
              }
            }
          >
          삭제
          </Button>
        );
      },
    },
  ]);

  useEffect(() => {
    if (keyword === '') {
      setBoards(adminState.boards);
    } else {
      setBoards(adminState.boards.filter((board: any) => {
        return board.title.includes(keyword) ||
          board.description.includes(keyword);
      }));
    }
  }, [keyword]);


  return (
    <div id="ManageBoardsContainer">
      <div style = {{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '78%',
      }}>
        <div style={{
          width: '64px',
        }}></div>
        <div id = "SearchContainer">
          <input type="text"
            placeholder="게시판 이름 / 설명으로 검색하세요"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}/>
        </div>
        <div>
          <Button
            variant="contained"
            className="addButton actionButton" component="span"
            onClick={() => setOpenDialog(true)}>
            <span>추가</span>
          </Button>
        </div>
      </div>
      <div id="ListContainer">
        <DataGrid
          className="grid"
          rows={boards}
          columns={columns.current}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <AddBoard
        open={openDialog}
        closeHandler={closeDialog}
      />
    </div>
  );
}
