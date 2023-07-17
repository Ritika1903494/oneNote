import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from'react-router-dom';
import { Notebook } from './Notebook';
import { Sectionpage } from './Sectionpage';

function App() {
  return (
    <div className="App">
     <Routes>
          <Route path="/" element={<Notebook/> }/>
          <Route path="/SectionPage" element={<Sectionpage/>}/>  
        </Routes>
    </div>
  );
}

export default App;
