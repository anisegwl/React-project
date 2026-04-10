import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        loading,
        setUser,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
