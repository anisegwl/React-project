import React, { useEffect, useState } from "react";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 5);
  };

  const handleDecrement = () => {
    setCount(count - 5);
  };
  const handleMultiplication = () => {
    setCount(count * 5);
  };
  const handleChangeName = () => {
    setName("Sagar");
  };

  return (
    <div className={`container  bg-${props.mode}  mt-5 color-white`}>
      this is card
      <div>
        <button onClick={handleIncrement}>click me to increase</button>
        <button onClick={handleDecrement}>click me to decrease</button>
        <button onClick={handleMultiplication}>click me to multiply</button>
        <button onClick={handleChangeName}> Change name</button>

        <p>you click {count} time in click me button</p>
        <p>click the change name button to change name : </p>
      </div>
      <div className="container">
        <h4>Welcome back to login page</h4>
      </div>
    </div>
  );
};

export default Card;