import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {UserLoginData} from '@modules/User/types';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {loginAsync} from '@modules/User/actions';
const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const {register, handleSubmit} = useForm<UserLoginData>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const onSubmit: SubmitHandler<UserLoginData> = (data, e) => {
    if (e) {
      e.preventDefault();
    }

    dispatch(loginAsync.request(data));
  };

  useEffect(()=>{
    if (user.result == 'success') {
      history.push('/');
    }
  }, [user]);


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
          <img src='img/logo.png'/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate
            onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
            <TextField
              {...register('username', {required: 'Username is Required'})}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              {...register('password', {required: 'Password is Required'})}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button component={RouterLink} to={'#'}>
                  'Forgot Password?'
                </Button>
              </Grid>
              <Grid item>
                <Button component={RouterLink} to={'/register'}>
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
