import React, {useEffect, useRef} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import './admin.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUserlistAsync} from '@modules/Admin/actions';
import AdminHeader from '@components/AdminHeader';
import Button from '@mui/material/Button';

export default function Admin() {
  const dispatch = useDispatch();
  const adminState = useSelector((state: any) => state.admin);
  useEffect(()=>{
    dispatch(getUserlistAsync.request('NORMAL_USER'));
  }, []);

  const authenticate = (id: number) => {
    console.log(id);
  };

  const deleteUser = (id: number) => {
    console.log('delete user ' + id);
  };

  const columns = useRef<GridColDef[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'fullname',
      headerName: '이름',
      width: 150,
      editable: false,
    },
    {
      field: 'username',
      headerName: '아이디',
      width: 150,
      editable: false,
    },
    {
      field: 'unit',
      headerName: '부대',
      width: 110,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.unit.name}`;
      },
    },
    {
      field: 'auth',
      headerName: '승인 / 삭제',
      headerAlign: 'center',
      width: 150,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={
                (event) => {
                  authenticate(params.row.id);
                }
              }
            >
              승인
            </Button>
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
          </>
        );
      },
    },
  ]);

  return (
    <div id="AdminContainer">
      <div id="ListContainer">
        <DataGrid
          rows={adminState.users}
          columns={columns.current}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
