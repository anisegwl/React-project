import React, { useEffect, useState } from 'react';
import UserContext from './UserContext'; 

const UserState = (props) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const resp = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await resp.json();
      setUser(data);
      console.log("User data:", data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // Run only once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
