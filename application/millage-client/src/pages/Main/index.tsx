import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {checkSessionAsync} from '@modules/User/actions';
import CreateBoardPage from '@pages/boards/CreateBoard';
import CreatePostPage from '@pages/boards/CreatePost';
import Schedule from '@pages/Schedule';
import Intro from '@pages/Intro';
import Header from '@components/Header';
import MainPage from './MainPage';

const Main = ({history}: RouteComponentProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const session = user.session;
  useEffect(()=>{
    dispatch(checkSessionAsync.request());
  }, []);

  if (session.role.id > 0) {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/create-board' component={CreateBoardPage} />
          <Route path='/create' component={CreatePostPage} />
          <Route path='/schedule' component={Schedule} />
        </Switch>
      </>
    );
  } else {
    return (
      <Intro />
    );
  }
};

export default Main;
