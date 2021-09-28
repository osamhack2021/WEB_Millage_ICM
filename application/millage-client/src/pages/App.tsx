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
        <Route exact path='/' component={Main} />
        <Route path='/login' component={SignIn} />
        <Route path="/register" component={Signup} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
