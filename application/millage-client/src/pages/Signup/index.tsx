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
import {createUserAsync, validateUserAsync} from '@modules/User/actions';
import {UserState, UserSubmitData, UserValidateData} from '@modules/User/types';
import {SubmitHandler, useForm} from 'react-hook-form';
import {REGISTER_FINISH_PATH} from '@constants';
import CSS from 'csstype';
import './signup.css';
import LoginHeader from '@components/LoginHeader';
const theme = createTheme();

interface SignupState{
  unitId: number;
  roleId: number;
  unitName: string;
}

export default function Signup() {
  const location = useLocation<SignupState>();
  const history = useHistory();
  const {register, getValues, handleSubmit} = useForm<UserSubmitData>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const userValidate = useSelector((state: any) => state.user.validate);
  const [responseState, setResponseState] = useState<UserState>({
    result: '',
  });

  const checkPassword = (p : string, p2 : string) => {
    if (p != p2) {
      setVPassword(1);
    } else {
      setVPassword(0);
    }
  };

  const [vUserName, setVUserName] = useState(0);
  const [vNickName, setVNickName] = useState(0);
  const [vEmail, setVEmail] = useState(0);
  const [vPassword, setVPassword] = useState(0);

  const onSubmit: SubmitHandler<UserSubmitData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }

    data.unitId = location.state.unitId;
    data.roleId = location.state.roleId;
    data.unitName = location.state.unitName;
    dispatch(createUserAsync.request(data));
  };

  const validateInput = (data: UserValidateData) => {
    dispatch(validateUserAsync.request(data));
  };

  useEffect(() => {
    if (user.result && user.result != '') {
      setResponseState(user);
    }
  }, [user]);

  useEffect(()=>{
    if (userValidate === 'Duplicate Nickname') {
      setVNickName(1);
    } else if (userValidate=== 'Duplicate Username') {
      setVUserName(1);
    } else if (userValidate=== 'Duplicate Email') {
      setVEmail(1);
    } else if (userValidate != '' && userValidate != 'undefined') {
      if (+userValidate == 0) {
        setVNickName(2);
      } else if (+userValidate == 1) {
        setVUserName(2);
      } else if (+userValidate == 5) {
        setVEmail(2);
      }
    }
  }, [userValidate]);

  useEffect(() => {
    if (responseState.result == 'registerSuccess') {
      alert('회원가입 성공');
      history.push(REGISTER_FINISH_PATH);
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
          <input className="buttonStyle disabled"
            {
              ...register('unitName')
            }
            id="unitName"
            name="unitName"
            autoComplete="unitName"
            value={location.state.unitName}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <label>전화번호(선택)</label>
          <input className="buttonStyle"
            {
              ...register('phonenumber')
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
      <LoginHeader />
      <ThemeProvider theme={theme}>
        <Container className="container" component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <label className="mainTitle">
              회원가입
            </label> */}
            <img src="/img/register/RegisterInputLarge.png" />
            <Box component="form" noValidate className="box"
              onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}
            >
              <label className="title">
                회원정보 입력
              </label>
              <Grid container spacing={3}>
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
                    onBlur={() =>
                      validateInput({nickname: getValues('nickname')})
                    }
                  />
                  <label className=
                    {vNickName == 1 ? 'warning' : 'hidden'}>
                      이미 사용중인 닉네임입니다.</label>
                  <label className=
                    {vNickName == 2 ? 'approve' : 'hidden'}>
                      사용 가능한 닉네임입니다.</label>
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
                    onBlur={() =>
                      validateInput({username: getValues('username')})
                    }
                  />
                  <label className=
                    {vUserName == 1 ? 'warning' : 'hidden'}>
                      이미 사용중인 아이디입니다.</label>
                  <label className=
                    {vUserName == 2 ? 'approve' : 'hidden'}>
                      사용 가능한 아이디입니다.</label>
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
                </Grid>
                <Grid item xs={12}>
                  <label>비밀번호 확인</label>
                  <input className="buttonStyle"
                    name="password_check"
                    placeholder="비밀번호를 한번 더 입력하세요."
                    type="password"
                    id="password_check"
                    onChange={(e) => {
                      checkPassword(getValues('password'), e.target.value);
                    }}
                  />
                  <label className=
                    {vPassword == 0 ? 'hidden' : 'warning'}>
                      비밀번호가 일치하지 않습니다</label>
                </Grid>
                <Grid item xs={12}>
                  <label>이메일</label>
                  <input className="buttonStyle"
                    {...register('email', {required: 'Email is Required'})}
                    id="email"
                    placeholder="이메일을 입력하세요."
                    name="email"
                    autoComplete="email"
                    onBlur={() =>
                      validateInput({email: getValues('email')})
                    }
                  />
                  <label className=
                    {vEmail == 1 ? 'warning' : 'hidden'}>
                      이미 가입된 이메일입니다.</label>
                  <label className=
                    {vEmail == 2 ? 'approve' : 'hidden'}>
                      사용 가능한 이메일입니다.</label>
                </Grid>
                {AdminComponent}
              </Grid>
              <Button
                type="submit"
                fullWidth
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
