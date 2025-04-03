/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("customer");
  const [role, setRole] = useState("anonymous");
  const [isLoading, setIsLoading] = useState(true); // ✅ 추가

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        console.log("accessToken payload:", decodedPayload);

        const roleName = decodedPayload.roleName || "anonymous";
        const normalizedRole = roleName.replace("ROLE_", "").toLowerCase();
        setRole(normalizedRole);
      } catch (err) {
        console.error("토큰 파싱 실패:", err);
        setRole("anonymous");
      }
    }
    setIsLoading(false); // ✅ 토큰 파싱 완료 후 렌더링 허용
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/auth/signin", { email, password });
      const { nickname, roleName, token } = response.data;

      localStorage.setItem("nickname", nickname);
      localStorage.setItem("role", roleName);
      localStorage.setItem("accessToken", token);

      setNickname(nickname);
      setRole(roleName.toLowerCase());
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setNickname("");
    setRole("anonymous");
    navigate("/auth/signin");
  };

  return (
    <>
      <div css={s.mainImgs}>
        <div css={s.mainImg}><img src="/main/Main.png" alt="메인 이미지" /></div>
        <div css={s.mainImg}><img src="/main/PT_1.jpg" alt="메인2 이미지" /></div>
        <div css={s.mainImg}><img src="/main/PT_2.jpg" alt="메인3 이미지" /></div>
        <div css={s.mainImg}><img src="/main/PT_3.jpg" alt="메인4 이미지" /></div>        
      </div>

      {/* ✅ role 확인이 끝나기 전까진 아무것도 렌더링하지 않음 */}
      {!isLoading && role !== "manager" && role !== "master" && (
        <div css={s.buttonbox}>
          <button css={s.floatingButton} onClick={() => navigate("/makefitness/membership")}>
            멤버십 가입하기
          </button> 
        </div>
      )}
    </>
  );
}

export default MainPage;
