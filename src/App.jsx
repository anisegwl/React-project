import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const handleNumberClick = (num) => {
    setCount(num);
  };


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

      <div className='divButton'>
        {/* Number buttons */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
          </button>
        ))}
      </div>
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
