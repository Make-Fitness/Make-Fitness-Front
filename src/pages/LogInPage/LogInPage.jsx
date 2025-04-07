import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../mutations/authMutation";
import Swal from "sweetalert2"; // Swal 추가

const LogInPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const loginMutation = useLoginMutation();

  // 토큰 저장 함수
  const setTokenLocalStorage = (name, token) => {
    localStorage.setItem("tokenName", name);
    localStorage.setItem("accessToken", token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();

    if (!username || !password) {
      setMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({ username, password });
      const tokenName = response.data.name;
      const accessToken = response.data.token;

      setTokenLocalStorage(tokenName, accessToken);

      await Swal.fire({
        icon: "success",
        text: "로그인 성공",
        timer: 1000,
        position: "center",
        showConfirmButton: false,
      });

      navigate("/"); // 로그인 성공 후 이동할 페이지
    } catch (error) {
      setMessage("로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.");
    }
  };
    const handleOAuth2LoginOnClick = (provider) => {
      window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  }

  return (
    <div css={s.container}>
      <img src="/main/logo.png" alt="MAKE FITNESS" css={s.logo} onClick={() => navigate("/")} />
      
      <form css={s.form} onSubmit={handleLogin}>
        <label>ID를 입력하세요</label>
        <input type="text" name="username" placeholder="ID 입력" />

        <label>비밀번호를 입력하세요</label>
        <input type="password" name="password" placeholder="비밀번호 입력" />

        {message && <div css={s.message}>{message}</div>}

        <button type="submit" css={s.loginButton}>로그인</button>
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
