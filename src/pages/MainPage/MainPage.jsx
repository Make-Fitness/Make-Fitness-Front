/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("customer"); // 사용자 닉네임
  const [role, setRole] = useState("anonymous");         // 사용자 권한
  const [isLoading, setIsLoading] = useState(true);      // 로딩 상태

  // 🔐 accessToken 존재 시 권한 정보 파싱
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];                 // JWT 중간부분
        const decodedPayload = JSON.parse(atob(payloadBase64));    // Base64 디코딩

        console.log("accessToken payload:", decodedPayload);

        const roleName = decodedPayload.roleName || "anonymous";
        const normalizedRole = roleName.replace("ROLE_", "").toLowerCase(); // e.g. ROLE_MANAGER → manager
        setRole(normalizedRole);
      } catch (err) {
        console.error("토큰 파싱 실패:", err);
        setRole("anonymous");
      }
    }

    setIsLoading(false); // ⏬ 파싱 끝나면 로딩 false
  }, []);

  // 🔐 로그인 요청 처리
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

  // 🔐 로그아웃
  const handleLogout = () => {
    localStorage.clear();
    setNickname("");
    setRole("anonymous");
    navigate("/auth/signin");
  };

  return (
    <>
      {/* ✅ 메인 이미지들 */}
      <div css={s.mainImgs}>
        <div css={s.mainImg}><img src="/main/Main.png" alt="메인 이미지" /></div>
        <div css={s.mainImg}><img src="/main/PT_1.jpg" alt="메인 이미지 2" /></div>
        <div css={s.mainImg}><img src="/main/PT_2.jpg" alt="메인 이미지 3" /></div>
        <div css={s.mainImg}><img src="/main/PT_3.jpg" alt="메인 이미지 4" /></div>        
      </div>

      {/* ✅ 관리자, 마스터 제외한 사용자만 버튼 표시 */}
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
