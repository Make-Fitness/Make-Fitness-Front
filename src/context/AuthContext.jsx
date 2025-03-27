// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLoginUser(decoded);
      } catch (e) {
        console.error("토큰 디코딩 실패", e);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};