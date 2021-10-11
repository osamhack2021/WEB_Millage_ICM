import React, {useEffect, useRef, useState} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import './admin.css';
import {useDispatch, useSelector} from 'react-redux';
import {authUserAsync, getUserlistAsync} from '@modules/Admin/actions';
import AdminHeader from '@components/AdminHeader';
import Button from '@mui/material/Button';

export default function Admin() {
  const dispatch = useDispatch();
  const adminState = useSelector((state: any) => state.admin);
  const authResult = useSelector((state: any) => state.admin.result);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    dispatch(getUserlistAsync.request(''));
  }, []);

  useEffect(() => {
    setUsers(adminState.users);
  }, [adminState.users]);

  useEffect(() => {
    console.log(authResult);
    if (authResult=== 'confirmsuccess') {
      alert('정상적으로 승인되었습니다');
    } else if (authResult === 'confirmfail') {
      alert('승인에 실패하였습니다.');
    }
  }, [authResult]);

  const [keyword, setKeyword] = useState('');

  const authenticate = (id: number) => {
    dispatch(authUserAsync.request(id));
  };

  const deleteUser = (id: number) => {
    console.log('delete user ' + id);
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
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.role.name}`;
      },
      flex: 1,
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
      setUsers(adminState.users.filter((unit: any) => {
        return unit.fullname.includes(keyword) ||
          unit.username.includes(keyword);
      }));
    }
  }, [keyword]);


  return (
    <div id="AdminContainer">
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
          sortModel={[{
            field: 'id',
            sort: 'desc',
          }]}
        />
      </div>
    </div>
  );
}
