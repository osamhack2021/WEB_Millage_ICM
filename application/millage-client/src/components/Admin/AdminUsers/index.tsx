import React, {useEffect, useRef, useState} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {
  authUserAsync,
  getUserlistAsync,
  deleteUserAsync,
  updateUserRoleAsync} from '@modules/Admin/actions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface OptionType {
  value: string;
  label: string;
};

export default function Admin() {
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const adminState = useSelector((state: any) => state.admin);
  const authResult = useSelector((state: any) => state.admin.result);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    dispatch(getUserlistAsync.request(userState.session.role.name));
  }, []);

  useEffect(() => {
    setUsers(adminState.users);
  }, [adminState.users]);

  useEffect(() => {
    if (authResult=== 'confirmUserSuccess') {
      alert('정상적으로 승인되었습니다');
    } else if (authResult === 'confirmUserFail') {
      alert('승인에 실패하였습니다.');
    } else if (authResult === 'deleteUserSuccess') {
      alert('유저를 삭제하였습니다.');
    } else if (authResult === 'deleteUserFail') {
      alert('삭제에 실패하였습니다.');
    }
  }, [authResult]);

  const [keyword, setKeyword] = useState('');


  const authenticate = (id: number) => {
    dispatch(authUserAsync.request(id));
  };

  const deleteUser = (id: number) => {
    dispatch(deleteUserAsync.request(id));
    dispatch(getUserlistAsync.request(''));
  };

  const handleChange = (id: number, event: any) => {
    dispatch(updateUserRoleAsync.request({
      id: id,
      roleId: event.target.value,
    }));
  };

  const columns = useRef<GridColDef[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'fullname',
      headerName: '이름',
      editable: false,
      flex: 1,
    },
    {
      field: 'nickname',
      headerName: '닉네임',
      editable: false,
      flex: 1,
    },
    {
      field: 'username',
      headerName: '아이디',
      editable: false,
      flex: 1,
    },
    {
      field: 'email',
      headerName: '이메일',
      editable: false,
      flex: 1,
    },
    {
      field: 'unit',
      headerName: '부대',
      editable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.unit ? `${params.row.unit.name}` : '';
      },
      flex: 1,
    },
    {
      field: 'role',
      headerName: '권한',
      editable: false,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.role.name}`;
      },
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <Select variant="standard"
              className="select"
              defaultValue={params.row.role.id}
              onChange={(event) => {
                handleChange(params.row.id, event);
              }}
            >
              <MenuItem value={1}>일반사용자</MenuItem>
              <MenuItem value={2}>부대관리자</MenuItem>
              <MenuItem value={3}>최고관리자</MenuItem>
            </Select>
          </>
        );
      },
    },
    {
      field: 'auth',
      headerName: '승인',
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.isConfirmed}`;
      },
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Button
            variant="contained"
            color="primary"
            className="actionButton"
            onClick={
              (event) => {
                authenticate(params.row.id);
                params.row.isConfirmed = 1;
              }
            }
            disabled={params.row.isConfirmed==1}
          >
            승인
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
                deleteUser(params.row.id);
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
      setUsers(adminState.users);
    } else {
      setUsers(adminState.users.filter((user: any) => {
        return user.fullname.includes(keyword) ||
          user.username.includes(keyword);
      }));
    }
  }, [keyword]);


  return (
    <>
      <div id = "SearchContainer">
        <input type="text"
          placeholder="사용자 이름 / 아이디로 검색하세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}/>
      </div>
      <div id="ListContainer">
        <DataGrid
          className="grid"
          rows={users}
          columns={columns.current}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
