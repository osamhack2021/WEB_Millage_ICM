import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Login from './login/Login';
import Signup from './signup/Signup';
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
      <Footer/>
    </div>

  );
}

export default App;
