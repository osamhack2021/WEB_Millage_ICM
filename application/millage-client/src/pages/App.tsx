import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import Main from '@pages/Main';
import CreateBoardPage from '@pages/boards/CreateBoard';
import CreatePostPage from '@pages/boards/CreatePost';
import './App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={SignIn} />
        <Route path="/register" component={Signup} />
        <Route path='/create-board' component={CreateBoardPage} />
        <Route path='/create' component={CreatePostPage} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
