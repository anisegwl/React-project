import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () =>{
    setCount(count + 1);
  };
  const handleDecrement = () =>{
    setCount(count-1);
  };
  return (
    <>
      
      
      <div className="card">
        <button onClick={handleIncrement}>
          Click Me to Increase
        </button>
        <button onClick={handleDecrement}> 
          Click Me to Decrease </button>
        <p>
          You click {count} time in click me button
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
