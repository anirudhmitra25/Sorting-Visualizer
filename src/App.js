import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import { HomePage } from './HomePage';
import './App.css';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/sorting" element={<SortingVisualizer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
