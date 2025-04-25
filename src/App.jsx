import React, { useContext, useState } from 'react'
import { context } from './main';

export default function App() {
  const [state,setstate]=useState(true);
  const {a,b}=useContext(context);


  return (
    <div style={state===true?{backgroundColor:"white"}:{height:"100vh",backgroundColor:"black"}}>
        <button style={{height:"50px"}} onClick={()=>{setstate(state===true?false:true)}}>click me</button>    
        <button onClick={()=>{b(a+1)}}>ticj me {a}</button>
    </div>
  )
}
