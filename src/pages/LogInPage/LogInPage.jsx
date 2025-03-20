import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../mutations/authMutation";
import Swal from "sweetalert2";

const LogInPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [message, setMessage] = useState(null); // 로그인 에러 메시지 상태 관리
  const loginMutation = useLoginMutation(); // 로그인 API 요청을 위한 훅

  // 로그인 성공 시 토큰을 로컬 스토리지에 저장하는 함수
  const setTokenLocalStorage = (name, token) => {
    localStorage.setItem("tokenName", name);
    localStorage.setItem("accessToken", token);
  };

  // OAuth 로그인 버튼 클릭 시 해당 소셜 로그인 페이지로 이동
  const handleOAuth2LoginOnClick = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setMessage(null); // 기존 메시지 초기화
  
    const username = e.target.elements.username.value.trim(); // 입력된 ID 값
    const password = e.target.elements.password.value.trim(); // 입력된 비밀번호 값
  
    if (!username || !password) { // ID 또는 비밀번호가 비어있는 경우
      setMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }
  
    try {
      const response = await loginMutation.mutateAsync({ username, password }); // 로그인 API 호출
  
      if (!response || !response.data) { // 응답이 없거나 잘못된 경우
        throw new Error("유효한 응답이 없습니다.");
      }
  
      const { token, nickname, roleName } = response.data; // API 응답에서 필요한 데이터 추출
  
      if (!token || !nickname || !roleName) { // 필수 데이터가 누락된 경우
        throw new Error("필수 데이터 누락");
      }
  
      localStorage.setItem("accessToken", token); // 토큰 저장
      localStorage.setItem("nickname", nickname); // 닉네임 저장
      localStorage.setItem("rolename", roleName); // 역할 저장
  
      setMessage(null); // 메시지 초기화
  
      Swal.fire({ // 로그인 성공 알림창 표시
        icon: "success",
        text: "로그인 성공",
        timer: 1000,
        position: "center",
        showConfirmButton: false,
      });
  
      setTimeout(() => {
        navigate("/auth/main"); // 로그인 성공 후 메인 페이지로 이동
      }, 500);
    } catch (error) {
      setMessage("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요."); // 로그인 실패 시 메시지 표시
    }
  };
  
  return (
    
    <div css={s.container}> {/* 로그인 페이지 컨테이너 */}
      {/* 로고 클릭 시 로그인 페이지로 이동 */}
      <img
        src="/logo.png"
        alt="MAKE FITNESS"
        css={s.logo}
        onClick={() => navigate("/auth")}
      />

      {/* 로그인 폼 */}
      <form css={s.form} onSubmit={handleLogin}>
        <label>ID를 입력하세요</label>
        <input type="text" name="username" placeholder="ID 입력" />

        <label>비밀번호를 입력하세요</label>
        <input type="password" name="password" placeholder="비밀번호 입력" />

        {message && <div css={s.message}>{message}</div>} {/* 로그인 에러 메시지 표시 */}

        {/* 소셜 로그인 버튼 */}
        <div css={s.socialLogin}>
          <button
            css={s.googleLogin}
            type="button"
            onClick={() => handleOAuth2LoginOnClick("google")}
          >
            <span>
              <FcGoogle />
            </span>
            <div css={s.letterg}>구글로 로그인</div>
          </button>
          <button
            css={s.naverLogin}
            type="button"
            onClick={() => handleOAuth2LoginOnClick("naver")}
          >
            <span>
              <SiNaver />
            </span>
            <div>네이버로 로그인</div>
          </button>
        </div>

        <button type="submit" css={s.loginButton}> {/* 로그인 버튼 */}
          로그인
        </button>
      </form>

      {/* 회원가입 링크 */}
      <div css={s.signupContainer}>
        <span css={s.qtext}>계정이 없으신가요?</span>
        <span css={s.highlightedText} onClick={() => navigate("/auth/signup")}>
          가입하기
        </span>
      </div>
    </div>
  );
};

export default LogInPage;
