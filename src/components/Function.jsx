import React, { useEffect, useState } from "react";

const Function = (props) => {
    // Component initialization
    const [count, setCount] = useState(0);

    //  Component Mounting
    useEffect(() => {
        console.log("Component Did Mount");
        props.toggleMode
        return () => {
            console.log("component will unmount");
        }
    }, [count]);

    // Updating
    const handleIncrement = () => {
        setCount(count + 5);
    };

    return (
        <div className={`container bg-${props.mode} mt-5 text-${props.text}`}>
            <p>this is Function based component </p>
            <div>
                <button onClick={handleIncrement}>click me to increase</button>
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

export default Function;
