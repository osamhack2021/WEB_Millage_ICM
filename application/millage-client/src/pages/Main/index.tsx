import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import {RouteComponentProps, Link as RouterLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {checkSessionAsync} from '@modules/User/actions';
const Main = ({history}: RouteComponentProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const session = user.session;
  useEffect(()=>{
    dispatch(checkSessionAsync.request());
  }, []);

  useEffect(()=>{
    console.log(session);
  }, [session]);

  if (session.auth != -1) {
    return (
      <div id="container">
        Add Main Page
      </div>
    );
  } else {
    return (
      <div id="container">
        <Button component={RouterLink} to={'/login'}>
                  로그인
        </Button>
        <Button component={RouterLink} to={'/register'}>
                  회원가입
        </Button>
      </div>
    );
  }
};

export default Main;
