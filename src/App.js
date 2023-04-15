import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './home/home';
import Body from './body/body';
import ChooseFood from './chooseFood/chooseFood';
import Meal from './meal/meal';
import Exercise from './exercise/exercise';
import Analysis from './analysis/analysis'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/body" element={<Body />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/choosefood" element={<ChooseFood />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </Router>
  );
}

export default App;