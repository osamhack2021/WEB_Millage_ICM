import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import Main from '@pages/Main';
import CreateBoardPage from '@pages/boards/CreateBoard';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path="/" component={SignIn} />
        <Route path="/signup" component={Signup} />
        <Route path='/boards/create' component={CreateBoardPage} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
