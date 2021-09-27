import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {checkSessionAsync} from '@modules/User/actions';
import Intro from '@pages/Intro';

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
      <Intro />
    );
  }
};

export default Main;
