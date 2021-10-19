import {useEffect, useRef, useState} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPlaceListAsync,
  updatePlaceAsync,
  deletePlaceAsync,
} from '@modules/Admin/actions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddPlace from './AddPlace';

import {PlaceUpdateData} from '@modules/Admin/types';
interface OptionType {
  value: string;
  label: string;
};

export default function AdminPlaces() {
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const adminState = useSelector((state: any) => state.admin);
  const authResult = useSelector((state: any) => state.admin.result);
  const [places, setPlaces] = useState([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };


  useEffect(()=>{
    dispatch(getPlaceListAsync.request());
  }, []);

  useEffect(() => {
    console.log(adminState.places);
    setPlaces(adminState.places);
  }, [adminState.places]);

  useEffect(() => {
    if (authResult=== 'updatePlaceSuccess') {
      alert('정상적으로 수정되었습니다');
    } else if (authResult === 'updatePlaceFail') {
      alert('수정에 실패하였습니다.');
    } else if (authResult === 'insertPlaceSuccess') {
      alert('정상적으로 시설을 추가하였습니다.');
    } else if (authResult === 'insertPlaceFail') {
      alert('시설 추가에 실패하였습니다.');
    } else if (authResult === 'deletePlaceSuccess') {
      alert('시설을 삭제하였습니다.');
    } else if (authResult === 'deletePlaceFail') {
      alert('시설 삭제에 실패하였습니다.');
    }
  }, [authResult]);

  const updatePlace = (data: GridValueGetterParams) => {
    const place : PlaceUpdateData = {
      id: data.row.id,
      name: data.row.name,
      description: data.row.description,
      seats: data.row.seats,
    };
    if (confirm('정말 이대로 수정하시겠습니까?')) {
      dispatch(updatePlaceAsync.request(place));
    }
  };

  const deletePlace = (id: number) => {
    if (confirm('정말 해당 게시판을 삭제하시겠습니까?')) {
      dispatch(deletePlaceAsync.request(id));
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
      headerName: '시설 명칭',
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
      field: 'seats',
      headerName: '최대 예약 인원 수',
      headerAlign: 'center',
      minWidth: 50,
      editable: true,
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
                updatePlace(params);
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
                deletePlace(+params.row.id);
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
      setPlaces(adminState.places);
    } else {
      setPlaces(adminState.places.filter((place: any) => {
        return place.name.includes(keyword) ||
          (place.description ? place.description.includes(keyword) : false);
      }));
    }
  }, [keyword]);


  return (
    <div id="ManagePlacesContainer">
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
            placeholder="시설 이름 / 설명으로 검색하세요"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}/>
        </div>
        <div>
          <Button
            variant="contained"
            className="addButton actionButton" component="span"
            style={{
              marginLeft: '10px',
            }}
            onClick={() => setOpenDialog(true)}>
            <span>추가</span>
          </Button>
        </div>
      </div>
      <div id="ListContainer">
        <DataGrid
          className="grid"
          rows={places}
          columns={columns.current}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <AddPlace
        open={openDialog}
        closeHandler={closeDialog}
      />
    </div>
  );
}
