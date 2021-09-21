import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Login from '@pages/Login';
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
