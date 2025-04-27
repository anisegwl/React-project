import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleMultiplication = () => {
    setCount(count * count)
  };

  const handleDivide = () => {
    setCount(count / count);
  }

  const handleRefresh = () => {
    setCount(count * 0);
  }
  return (
    <>
    <div className='buttons'>
      <button onClick={handleIncrement}>ADD</button>
      <button onClick={handleDecrement}>Subtract</button>
      <button onClick={handleMultiplication}>Multiply</button>
      <button onClick={handleDivide}>Divide</button>
      </div>
      <div className="refreshBtn">
        <button onClick={handleRefresh}>Refresh</button>
      </div>



      <p>
        Result = {count}
      </p>

    </>
  )
}

export default App
