/** @jsxImportSource @emotion/react */
import React from "react";
import { FcGoogle } from "react-icons/fc";
import * as s from "./style";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 Hook

const LogInPage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  return (
    <div css={s.container}>
      <img src="/logo.png" alt="MAKE FITNESS" css={s.logo} />

      <form css={s.form}>
        <label>ID를 입력하세요</label>
        <input type="text" placeholder="ID 입력" />

        <label>비밀번호를 입력하세요</label>
        <input type="password" placeholder="비밀번호 입력" />

        <div css={s.socialLogin}>
          <button css={s.googleLogin}>
            <span><FcGoogle /></span>
            구글로 로그인
          </button>
          <button css={s.naverLogin}>
            <img src="/navericon.png" alt="네이버 아이콘" />
            네이버로 로그인
          </button>
        </div>

        <button css={s.loginButton}>로그인</button>
      </form>

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
