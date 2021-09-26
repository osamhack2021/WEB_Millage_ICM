import React, {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createUserAsync} from '@modules/User/actions';
import {UserSubmitData} from '@modules/User/types';
import {SubmitHandler, useForm} from 'react-hook-form';
const theme = createTheme();

export default function SignUp() {
  const {register, handleSubmit} = useForm<UserSubmitData>();
  const dispatch = useDispatch();
  const result = useSelector((state: any) => state.user.response);

  const onSubmit: SubmitHandler<UserSubmitData> = (data) => {
    console.log(data);

    useEffect(() => {
      dispatch(createUserAsync.request(data));
    }, [dispatch]);

    console.log(result);
  };

  return (
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
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate
            onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register('username', {required: 'Username is Required'})}
                  fullWidth
                  id="username"
                  label="유저 아이디"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password', {required: 'Password is Required'})}
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('fullname', {required: 'Name is Required'})}
                  fullWidth
                  id="fullname"
                  label="이름"
                  name="fullname"
                  autoComplete="fullname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('nickname')}
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="nickname"
                  autoComplete="nickname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email', {required: 'Email is Required'})}
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {
                    ...register('phonenumber',
                        {required: 'Phone number is Required'})
                  }
                  fullWidth
                  id="phonenumber"
                  label="전화번호"
                  name="phonenumber"
                  autoComplete="phonenumber"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button component={RouterLink} to={'/'}>
                  'Don\'t have an account? Sign Up'
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
