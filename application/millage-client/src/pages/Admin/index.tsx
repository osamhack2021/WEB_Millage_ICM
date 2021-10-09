import React, {useEffect, useRef} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import './admin.css';
import {useDispatch, useSelector} from 'react-redux';
import {getUserlistAsync} from '@modules/Admin/actions';
import AdminHeader from '@components/AdminHeader';

export default function Admin() {
  const dispatch = useDispatch();
  const adminState = useSelector((state: any) => state.admin);
  useEffect(()=>{
    dispatch(getUserlistAsync.request('NORMAL_USER'));
  }, []);

  const columns = useRef<GridColDef[]>([
    {field: 'id', headerName: 'ID', width: 90},
    {
      field: 'fullname',
      headerName: '이름',
      width: 150,
      editable: true,
    },
    {
      field: 'username',
      headerName: '아이디',
      width: 150,
      editable: true,
    },
    {
      field: 'unit',
      headerName: '부대',
      width: 110,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.row.unit.name}`;
      },
    },
  ]);

  return (
    <div id="AdminContainer">
      <AdminHeader />
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
