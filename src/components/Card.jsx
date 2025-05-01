import React, { useState } from "react";

const Card = (props) => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Guest");

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
    <div className={`container bg-${props.mode} mt-5 text-${props.text}`}>
      <p>this is card</p>
      <div>
        <button onClick={handleIncrement}>click me to increase</button>
        <button onClick={handleDecrement}>click me to decrease</button>
        <button onClick={handleMultiplication}>click me to multiply</button>
        <button onClick={handleChangeName}>Change name</button>

        <p>you clicked {count} times</p>
        <p>click the change name button to change name: {name}</p>
        <p>Current text prop value from App.js: {props.text}</p>
      </div>
      <div className="container">
        <h4>Welcome back to login page</h4>
      </div>
    </div>
  );
};

export default Card;
