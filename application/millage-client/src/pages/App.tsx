import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import CreateBoardPage from '@pages/boards/CreateBoard';
import CreatePostPage from '@pages/boards/CreatePost';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={Signup} />
        <Route path='/create-board' component={CreateBoardPage} />
        <Route path='/create' component={CreatePostPage} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
