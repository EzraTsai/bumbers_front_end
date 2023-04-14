import logo from './logo.svg';
import bPlogo from './bplogo.png'
import './App.css';
import React from 'react';

function App() {
  return (

    <div className="App" style={{ marginTop: '100px' }}>
      {/* <h1>Body Predictor</h1> */}
      <img src={bPlogo} className="App-logo" alt="logo"></img>
      <h1>Body Predictor</h1>


    </div>
  );
}

export default App;