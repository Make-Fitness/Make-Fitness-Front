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
        console.log("🔥 디코딩된 JWT:", decoded);
  
        setLoginUser({
          jti: decoded.jti,                     // 반드시 포함
          nickname: decoded.nickname,          // 선택
          role: decoded.role || decoded.roleName, // 이름 다르면 처리
          ph: decoded.ph                       // 전화번호도 가능
        });
      } catch (e) {
        console.error("❌ 토큰 디코딩 실패:", e);
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