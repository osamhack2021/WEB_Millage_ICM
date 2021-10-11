import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import Main from '@pages/Main';
import './App.css';
import UserType from '@pages/UserType';
import UnitList from '@components/UnitList';
import SignupFinish from '@pages/SignupFinish';
import {
  SIGNIN_PATH,
  ROOT_PATH,
  SIGNUP_PATH,
  UNITSELECT_PATH,
  USERTYPE_PATH,
  ADMIN_UNITSELECT_PATH,
  REGISTER_FINISH_PATH,
} from '@constants';

function App() {
  return (
    <>
      <Switch>
        <Route exact path={SIGNIN_PATH} component={SignIn} />
        <Route exact path={UNITSELECT_PATH} component={UnitList} />
        <Route exact path={ADMIN_UNITSELECT_PATH} component={UnitList} />
        <Route exact path={SIGNUP_PATH} component={Signup} />
        <Route exact path={USERTYPE_PATH} component={UserType} />
        <Route exact path={REGISTER_FINISH_PATH} component={SignupFinish} />
        <Route path={ROOT_PATH} component={Main} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
