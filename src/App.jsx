import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './Routes/AppRoutes'


function App() {
  const [count, setCount] = useState(0)

  return (
    //<Login />
    // <Home />
    //  <Questions />
    // <Quiz />
     // <Admin />
    <AppRoutes />
  )
}

export default App;
