import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useDispatch} from 'react-redux';
import Button from '@mui/material/Button';
import './addboard.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {SubmitHandler, useForm} from 'react-hook-form';
import {BoardInsertData} from '@modules/Admin/types';
import Switch from '@mui/material/Switch';
type Props = {
  open: boolean;
  closeHandler: () => void;
};

const initialDialogState : BoardInsertData = {
  title: '',
  description: '',
  auth: false,
  pollAllowed: false,
  recruitAllowed: false,
  imageAllowed: false,
};

const AddBoard :React.FC<Props> = ({closeHandler, open}) => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState<string>('관리자만');
  const [imageAllowed, setImageAllowed] = useState<string>('불가능');
  const [pollAllowed, setPollAllowed] = useState<string>('불가능');
  const [recruitAllowed, setRecruitAllowed] = useState<string>('불가능');
  const {register, getValues, handleSubmit} = useForm<BoardInsertData>();
  useEffect(() => {
    if (open == true) {
      register;
    }
  }, [open]);

  const onSubmit: SubmitHandler<BoardInsertData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
  };

  return (
    <Dialog id="AddBoardDialog" onClose={closeHandler} open={open}>
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
        새로운 게시판 추가
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
                  <label>게시판 명</label>
                  <input className="buttonStyle"
                    {...register('title', {required: true})}
                    placeholder="게시판 이름을 입력하세요."
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>설명</label>
                  <input className="buttonStyle"
                    {...register('description')}
                    placeholder="게시판 설명을 입력하세요."
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>설문 가능 여부</label>
                  <Switch
                    {...register('pollAllowed')}
                    onChange={
                      (e, checked)=>setPollAllowed(checked ? '가능' : '불가능')}
                  />
                  <span>{pollAllowed}</span>
                </Grid>
                <Grid item xs={12}>
                  <label>모집 가능 여부</label>
                  <Switch
                    {...register('recruitAllowed')}
                    onChange={
                      (e, checked)=>setRecruitAllowed(checked ? '가능' : '불가능')}
                  />
                  <span>{recruitAllowed}</span>
                </Grid>
                <Grid item xs={12}>
                  <label>이미지 가능 여부</label>
                  <Switch
                    {...register('imageAllowed')}
                    onChange={
                      (e, checked)=>setImageAllowed(checked ? '가능' : '불가능')}
                  />
                  <span>{imageAllowed}</span>
                </Grid>
                <Grid item xs={12}>
                  <label>글쓰기 권한</label>
                  <Switch
                    {...register('auth')}
                    onChange={
                      (e, checked)=>setAuth(checked ? '아무나' : '관리자만')}
                  />
                  <span>{auth}</span>
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


export default AddBoard;
