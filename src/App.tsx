import React from 'react';
import Landing from './Components/Landing'
import Home from './Components/Home'
import Details from './Components/Details';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import axios from 'axios';
function App() {
  axios.defaults.baseURL="https://kanto-pokedex-api-production.up.railway.app/pokemon"
  localStorage.setItem('requestBack',JSON.stringify({query:'',order:{}}))
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/home/details/:id' element={<Details/>}/>
      </Routes>
    </div>
  );
}

export default App;
