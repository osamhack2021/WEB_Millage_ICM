import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import Main from '@pages/Main';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/login' component={SignIn} />
        <Route exact path="/register" component={Signup} />
        <Route path='/' component={Main} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
