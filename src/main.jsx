import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const context =createContext();

const Red=()=>{
  const [a,b]=useState(0);
  return(
     <context.Provider value={{a,b}}>
     <App />
     </context.Provider>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Red/>
  </StrictMode>,
)
