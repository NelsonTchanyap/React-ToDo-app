import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import { Routes , Route } from "react-router-dom";
import  Home  from './Pages/Home'
import UpdateContextProvider from './Contexts/UpdateContextProvider';

function App() {
 
  return (
  
  <UpdateContextProvider>
    <Home/>
  </UpdateContextProvider>
   
  );
 
}

export default App;
