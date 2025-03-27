import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // 백엔드에서 저장한 토큰 키 이름에 맞게 수정
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setLoginUser(decoded); // 토큰 디코드해서 로그인 정보 저장
      } catch (err) {
        console.error("토큰 디코딩 에러", err);
        setLoginUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};