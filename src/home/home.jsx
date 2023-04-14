import React from 'react';
import bPlogo from '../bplogo.png'
import Tab from './tab'

const Home = () => {
    return (
        <div className="App" style={{ marginTop: '100px' }}>
            <img src={bPlogo} className="App-logo" alt="logo"></img>
            <h1>Body Predictor</h1>
            <Tab></Tab>
        </div>
    );
}

export default Home;