import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import Main from '@pages/Main';
import './App.css';
import UnitList from '@components/UnitList';
import {
  SIGNIN_PATH,
  ROOT_PATH,
  SIGNUP_PATH,
  REGISTER_PATH,
} from '@constants';

function App() {
  return (
    <>
      <Switch>
        <Route exact path={SIGNIN_PATH} component={SignIn} />
        <Route exact path={REGISTER_PATH} component={UnitList} />
        <Route exact path={SIGNUP_PATH} component={Signup} />
        <Route path={ROOT_PATH} component={Main} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
