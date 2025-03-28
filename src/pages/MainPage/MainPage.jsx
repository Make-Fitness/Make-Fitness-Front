/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState } from 'react';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("customer");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/auth/signin", { email, password });
      const { nickname, roleName, token } = response.data;
  
      const mappedRole = roleMapping[roleName] || "anonymous";
  
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("role", roleName);
      localStorage.setItem("accessToken", token);
  
      setNickname(nickname);
      setRole(mappedRole);
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // 모든 저장된 로컬스토리지 데이터 제거
    setNickname(""); 
    setRole("anonymous");
    navigate("/auth/signin"); 
  };

  return (
      <>
        <div css={s.mainImgs}> {/* 메인 이미지 영역 */}
          <div css={s.mainImg}><img src="/main/Main.png" alt="메인 이미지" /></div>
          <div css={s.mainImg}><img src="/main/PT_1.jpg" alt="메인2 이미지" /></div>
          <div css={s.mainImg}><img src="/main/PT_2.jpg" alt="메인3 이미지" /></div>
          <div css={s.mainImg}><img src="/main/PT_3.jpg" alt="메인4 이미지" /></div>        
        </div>

        <div css={s.buttonbox}>
          <button css={s.floatingButton} onClick={() => navigate("/makefitness/membership")}>
            멤버십 가입하기
          </button> 
        </div>
      </>
  );
}

export default MainPage;
