import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import Main from '@pages/Main';
import CreatePostPage from '@pages/boards/CreatePost';
import CreateBoardPage from '@pages/boards/CreateBoard';
import BoardViewPage from '@pages/boards/BoardView';
import './App.css';
import UnitList from '@components/UnitList';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/login' component={SignIn} />
        <Route exact path="/register" component={UnitList} />
        <Route exact path="/register/user" component={Signup} />
        <Route path='/' component={Main} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
