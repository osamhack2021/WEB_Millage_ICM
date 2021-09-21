import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import SignIn from '@pages/SignIn';
import Signup from '@pages/Signup';
import './App.css';

function App() {
  return (
    <>
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
