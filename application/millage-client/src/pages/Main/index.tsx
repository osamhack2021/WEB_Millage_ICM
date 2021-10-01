import React, {useEffect} from 'react';
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
import {
  BOARD_VIEW_PATH,
  CREATE_BOARD_PATH,
  CREATE_POST_PATH,
  DM_PATH,
  ROOT_PATH,
  SCHEDULE_PATH,
} from '@constants';

const Main = () => {
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
          <Route exact path={ROOT_PATH} component={MainPage} />
          <Route path={SCHEDULE_PATH} component={Schedule} />
          <Route path={DM_PATH} component={DM} />
          <Route path={CREATE_POST_PATH} component={CreatePostPage} />
          <Route path={CREATE_BOARD_PATH} component={CreateBoardPage} />
          <Route path={BOARD_VIEW_PATH} component={BoardViewPage} />
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
