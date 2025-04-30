import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Card from './components/Card';



function App() {
  const [count, setCount] = useState(0);
  const [name, SetName] = useState("Anise")

  const userName = ()=>{
    SetName("Tung Tung Sahur");
  }

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
<Card/>
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

      <button onClick={userName}>Click to change the Name</button>
      <p> Your Name is {name}</p>
      
    

      <div className='container'>
        <h4>Welcome back to login page</h4>
      </div>

    </>
  )
}

export default App
