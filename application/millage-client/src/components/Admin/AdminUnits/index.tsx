import React, {useEffect, useRef, useState} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {
  authUnitAsync,
  getUnitlistAsync,
  deleteUnitAsync} from '@modules/Admin/actions';
import Button from '@mui/material/Button';
import {UnitData} from '@modules/Admin/types';

export default function Admin() {
  const dispatch = useDispatch();
  const adminState = useSelector((state: any) => state.admin);
  const authResult = useSelector((state: any) => state.admin.result);
  const [units, setUnits] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(()=>{
    dispatch(getUnitlistAsync.request());
  }, []);

  useEffect(() => {
    setUnits(adminState.units);
  }, [adminState.units]);

  useEffect(() => {
    if (authResult=== 'confirmUnitSuccess') {
      alert('정상적으로 승인되었습니다');
    } else if (authResult === 'confirmUnitFail') {
      alert('승인에 실패하였습니다.');
    } else if (authResult === 'deleteUnitSuccess') {
      alert('부대를 삭제하였습니다.');
    } else if (authResult === 'deleteUnitFail') {
      alert('삭제에 실패하였습니다.');
    }
  }, [authResult]);

  const authenticate = (id: number) => {
    const c = confirm('정말로 이 부대를 승인하시겠습니까?');
    if (c) {
      dispatch(authUnitAsync.request(id));
    }
  };

  const deleteUnit = (id: number) => {
    const c = confirm('정말로 이 부대를 삭제하시겠습니까?');
    if (c) {
      dispatch(deleteUnitAsync.request(id));
      dispatch(getUnitlistAsync.request());
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
      field: 'name',
      headerName: '이름',
      editable: false,
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
                deleteUnit(params.row.id);
              }
            }
          >
          삭제
          </Button>
        );
      },
    },
  ]);

  return (
    <>
      <div id = "SearchContainer">
        <input type="text"
          placeholder="부대 이름을 검색하세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}/>
      </div>
      <div id="ListContainer">
        <DataGrid
          className="grid"
          rows={units}
          columns={columns.current}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}
