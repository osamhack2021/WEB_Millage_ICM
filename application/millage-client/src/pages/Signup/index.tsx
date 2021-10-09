import React, {useEffect, useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, makeStyles, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink, useLocation, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createUserAsync} from '@modules/User/actions';
import {UserState, UserSubmitData} from '@modules/User/types';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ROOT_PATH} from '@constants';
import CSS from 'csstype';
import './signup.css';
const theme = createTheme();

interface SignupState{
  unitId: number;
  roleId: number;
}

export default function Signup() {
  const location = useLocation<SignupState>();
  const history = useHistory();
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const {register, handleSubmit} = useForm<UserSubmitData>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [responseState, setResponseState] = useState<UserState>({
    result: '',
  });

  const [validate, setValidate] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const onSubmit: SubmitHandler<UserSubmitData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }
    data.unitId = location.state.unitId;
    data.roleId = location.state.roleId;
    dispatch(createUserAsync.request(data));
  };

  useEffect(() => {
    if (user.result && user.result != '') {
      setResponseState(user);
    }
  }, [user]);

  useEffect(() => {
    if (responseState.result == 'registerSuccess') {
      alert('회원가입 성공');
      history.push(ROOT_PATH);
    } else if (responseState.result == 'registerFail') {
      alert(responseState.message);
    } else if (responseState.result == 'registerError') {
      alert(responseState.message);
    }
  }, [responseState]);

  let AdminComponent;

  if (location.state.roleId == 2) {
    AdminComponent = (
      <>
        <Grid item xs={12}>
          <label>부대명</label>
          <input className="buttonStyle"
            {
              ...register('unitName',
                  {required: 'Phone number is Required'})
            }
            id="unitName"
            name="unitName"
            autoComplete="unitName"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <label>전화번호 (선택)</label>
          <input className="buttonStyle"
            {
              ...register('phonenumber',
                  {required: 'Phone number is Required'})
            }
            id="phonenumber"
            placeholder="전화번호를 입력하세요"
            name="phonenumber"
            autoComplete="phonenumber"
          />
        </Grid>
      </>
    );
  }

  return (
    <div id="SignupContainer">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src="/img/register.png" />
            <Box component="form" noValidate
              onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}
            >
              <Typography className="title" variant="subtitle2" >
                회원정보 입력
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label>이름</label>
                  <input className="buttonStyle"
                    {...register('fullname', {required: 'Name is Required'})}
                    placeholder="본인의 이름을 입력하세요."
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>닉네임</label>
                  <input className="buttonStyle"
                    {...register('nickname')}
                    id="nickname"
                    placeholder="밀리지에서 활동한 닉네임을 입력하세요."
                    name="nickname"
                  />
                  <label className=
                    {validate[0] == 0 ? 'hidden' : 'warning'}>
                      이미 사용중인 닉네임입니다.</label>
                </Grid>
                <Grid item xs={12}>
                  <label>아이디</label>
                  <input className="buttonStyle"
                    {...register('username',
                        {required: 'Username is Required'})}
                    id="username"
                    placeholder="로그인 시 사용할 아이디를 입력하세요."
                    name="username"
                    autoComplete="username"
                  />
                  <label className=
                    {validate[1] == 0 ? 'hidden' : 'warning'}>
                      이미 사용중인 아이디입니다.</label>
                  <label className=
                    {validate[2] == 0 ? 'hidden' : 'approve'}>
                      사용가능한 아이디입니다.</label>
                </Grid>
                <Grid item xs={12}>
                  <label>비밀번호</label>
                  <input className="buttonStyle"
                    {...register('password',
                        {required: 'Password is Required'})}
                    name="password"
                    placeholder="비밀번호를 입력하세요."
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  <label className=
                    {validate[3] == 0 ? 'hidden' : 'warning'}>
                      비밀번호가 맞지않습니다</label>
                </Grid>
                <Grid item xs={12}>
                  <label>비밀번호 확인</label>
                  <input className="buttonStyle"
                    value={passwordCheck}
                    name="password_check"
                    placeholder="비밀번호를 한번 더 입력하세요."
                    type="password"
                    id="password_check"
                    onChange={(e) => {
                      setPasswordCheck(e.target.value);
                    }}
                  />
                  <label className=
                    {validate[4] == 0 ? 'hidden' : 'warning'}>
                      비밀번호가 맞지않습니다</label>
                </Grid>
                <Grid item xs={12}>
                  <label>이메일</label>
                  <input className="buttonStyle"
                    {...register('email', {required: 'Email is Required'})}
                    id="email"
                    placeholder="이메일을 입력하세요."
                    name="email"
                    autoComplete="email"
                  />
                  <label className=
                    {validate[5] == 0 ? 'hidden' : 'warning'}>
                      이미 가입된 이메일입니다.</label>
                </Grid>
                {AdminComponent}
              </Grid>
              <Button
                type="submit"
                fullWidth
                style={{
                  backgroundColor: '#10902C',
                  fontFamily: 'Inter',
                  fontWeight: 'bold',
                  fontSize: '10px',
                }}
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                가입하기
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
