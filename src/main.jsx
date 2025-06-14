import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

export const context =createContext();

const Red=()=>{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, settoken] = useState("");
  return(
     <context.Provider value={{
        isAuthenticated,
        setIsAuthenticated,
        token, 
        settoken,
      }}>
     <App />
     </context.Provider>
  )
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Red/>
  </StrictMode>,
)


 