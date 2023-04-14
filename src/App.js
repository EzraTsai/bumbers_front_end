import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './home/home';
import Body from './body/body';
import Food from './food/food';
import Exercise from './exercise/exercise';
import Analysis from './analysis/analysis'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/body" element={<Body />} />
        <Route path="/food" element={<Food />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </Router>
  );
}

export default App;