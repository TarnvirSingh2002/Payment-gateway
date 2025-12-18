import React from 'react'
import Login from './Components/Login'
import SignIn from './Components/SignIn'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import PaymentComplete from './Components/PaymentComplete';
import CheckoutForm from './Components/CheckoutForm';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/SignIn" element={<SignIn/>}/>
          <Route path="/checkout-form" element={<CheckoutForm/>}/>
          <Route path='/Payment-gateway' element={<Dashboard/>}/>
          <Route path="/payment-complete" element={<PaymentComplete />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
