import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from '@components/Header';
import {checkSessionAsync} from '@modules/User/actions';
import CreateBoardPage from '@pages/boards/CreateBoard';
import CreatePostPage from '@pages/boards/CreatePost';
import Schedule from '@pages/Schedule';
import Intro from '@pages/Intro';
import DM from '@pages/DM';
import Admin from '@pages/Admin';
import {Role} from '@constants';
import {
  BOARD_PATH,
  CREATE_BOARD_PATH,
  CREATE_POST_PATH,
  DM_PATH,
  ROOT_PATH,
  SCHEDULE_PATH,
  RESERVATION_PATH,
  USER_MANAGE_PATH,
} from '@constants';
import BoardRoutes from '@pages/boards/BoardRoutes';
import AdminHeader from '@components/Admin/AdminHeader';
import Reservation from '@pages/Reservation';
import AdminUsers from '@components/Admin/AdminUsers';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  useEffect(()=>{
    dispatch(checkSessionAsync.request());
  }, []);
  if (user.session.role.name == Role.SUPER_ADMIN) {
    return (
      <>
        <AdminHeader />
        <Switch>
          <Route exact path={ROOT_PATH} component={Admin} />
          <Route path={DM_PATH} component={DM} />
        </Switch>
      </>
    );
  } else if (true) {// user.session.role.id > 0) {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path={ROOT_PATH} component={BoardRoutes} />
          <Route path={BOARD_PATH} component={BoardRoutes} />
          <Route path={CREATE_POST_PATH} component={CreatePostPage} />
          <Route path={CREATE_BOARD_PATH} component={CreateBoardPage} />
          <Route path={SCHEDULE_PATH} component={Schedule} />
          <Route path={DM_PATH} component={DM} />
          <Route path={RESERVATION_PATH} component={Reservation} />
          <Route path={USER_MANAGE_PATH} render={
            () => {
              return (
                <div id="AdminContainer">
                  <AdminUsers />
                </div>
              );
            }
          } />
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
