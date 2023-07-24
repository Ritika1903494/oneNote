import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from'react-router-dom';
import { Notebook } from './Notebook';


function App() {
  return (
    <div className="App">
     <Routes>
          <Route path="/" element={<Notebook/> }/>
        </Routes>
    </div>
  );
}

export default App;
