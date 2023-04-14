import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home/home';
import Body from './body/body';
import Food from './food/food';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/body" element={<Body />} />
        <Route path="/food" element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;