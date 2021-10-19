import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import './addplace.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SubmitHandler, useForm} from 'react-hook-form';
import {PlaceInsertData} from '@modules/Admin/types';
import Switch from '@mui/material/Switch';
import {RootState} from '@modules';
import {insertPlaceAsync} from '@modules/Admin/actions';
type Props = {
  open: boolean;
  closeHandler: () => void;
};

const initialDialogState : PlaceInsertData = {
  name: '',
  description: '',
  seats: 1,
};

const AddPlace :React.FC<Props> = ({closeHandler, open}) => {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.user.session);
  const {register, getValues, handleSubmit, reset} = useForm<PlaceInsertData>();

  const onSubmit: SubmitHandler<PlaceInsertData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(insertPlaceAsync.request(data));
    closeHandler();
  };

  useEffect(() => {
    if (open == true) {
      reset(initialDialogState);
    }
  }, [open]);

  return (
    <Dialog id="AddPlaceDialog" onClose={closeHandler} open={open}>
      <IconButton
        aria-label="close"
        onClick={closeHandler}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        새로운 시설 추가
      </DialogTitle>
      <DialogContent>
        <Container className="container" component="main">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate className="box"
              onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <label>시설 명칭</label>
                  <input className="buttonStyle"
                    {...register('name', {required: true})}
                    placeholder="시설 이름을 입력하세요."
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>설명</label>
                  <input className="buttonStyle"
                    {...register('description')}
                    placeholder="시설에 대한 설명을 입력하세요."
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>최대 허용 인원 수</label>
                  <input className="buttonStyle"
                    {...register('seats')}
                    placeholder="예약 당 허용할 인원 수를 선택하세요"
                  />
                </Grid>

              </Grid>
              <Button
                className="submitButton"
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                  추가하기
              </Button>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};


export default AddPlace;
