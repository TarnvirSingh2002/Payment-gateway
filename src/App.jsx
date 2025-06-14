import React from 'react'
import Login from './Components/Login'
import SignIn from './Components/SignIn'
import './App.css';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
