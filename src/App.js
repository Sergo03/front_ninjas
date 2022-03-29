
import React from 'react';
import {Routes,Route,} from 'react-router-dom';

import './App.css';
import AddSuperhero from './components/CreateSuperhero'
import Home from './components/Home'
import HeroDetails from './components/HeroDetails';


function App() {
  return ( 
    <>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/addsuperhero" element={<AddSuperhero/>} />
        <Route path="/hero/:heroId" element={<HeroDetails/>} />
      </Routes>
   
</>

      
  )
}

export default App;
