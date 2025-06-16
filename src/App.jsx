import React from 'react'
import Login from './Components/Login'
import SignIn from './Components/SignIn'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path='/Payment-gateway' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
