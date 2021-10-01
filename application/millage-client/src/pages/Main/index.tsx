import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import Header from '@components/Header';
import {checkSessionAsync} from '@modules/User/actions';
import CreateBoardPage from '@pages/boards/CreateBoard';
import CreatePostPage from '@pages/boards/CreatePost';
import Schedule from '@pages/Schedule';
import Intro from '@pages/Intro';
import MainPage from './MainPage';
import DM from '@pages/DM';
import BoardViewPage from '@pages/boards/BoardView';

const Main = (props: RouteComponentProps) => {
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
          <Route path='/schedule' component={Schedule} />
          <Route path='/dm' component={DM} />
          <Route path='/create' component={CreatePostPage} />
          <Route path='/create-board' component={CreateBoardPage} />
          <Route path='/board/:boardId' component={BoardViewPage} />
        </Switch>
      </>
    );
  } else {
    return (
      <Intro {...props} />
    );
  }
};

export default Main;
