import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Login from '@pages/Login';
import Signup from '@pages/Signup'
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
