import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decoded.user);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode(newToken);
    setToken(newToken);
    setUser(decoded.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
