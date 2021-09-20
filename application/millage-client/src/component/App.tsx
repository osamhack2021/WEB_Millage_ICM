import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Login from './login/Login';
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <div id = "mainFrame">
        <Login/>
      </div>
      <Footer/>
    </div>

  );
}

export default App;
