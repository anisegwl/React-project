import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';
import Banner from './components/Banner';


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
<Navbar/>
<br></br>
<Banner/>
      <div className='container mt-5'>
        <button onClick={handleIncrement}>ADD</button>
        <button onClick={handleDecrement}>Subtract</button>
        <button onClick={handleMultiplication}>Multiply</button>
        <button onClick={handleDivide}>Divide</button>
      </div>
      <div className=" container refreshBtn">
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <p className='container'>
        Result = {count}
      </p>

      <div className='container'>
        <h4>Welcome back to login page</h4>
      </div>

    </>
  )
}

export default App
