/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState, useEffect } from 'react';
import { MENUS } from '../../constants/menu';

function MainPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("manager");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");  // ✅ 닉네임 가져오기
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");  // ✅ 토큰 삭제
    localStorage.removeItem("nickname");  // ✅ 닉네임 삭제
    setNickname(""); // ✅ 닉네임 초기화
    navigate("/auth/signin");  // ✅ 로그인 페이지로 이동
  };

  return (
    <div css={s.root}>
      <div css={s.container}>
        <div css={s.header}>
          <div css={s.logo}>
            <img src="/logo.png" alt="메인 로고" onClick={() => navigate("/auth")} />
          </div>
          <div css={s.signinbox}>
            {nickname ? (
              <span css={s.welcome}>
                {nickname}님 환영합니다 <button onClick={handleLogout} css={s.logout}>로그아웃</button>
              </span>
            ) : (
              <>
                <span css={s.signin} onClick={() => navigate("/auth/signin")}>로그인</span>
                <span css={s.signup} onClick={() => navigate("/auth/signup")}>회원가입</span>
              </>
            )}
          </div>
        </div>
        <div css={s.navigation}>
          <ul>
            {MENUS[role]?.map(menu => (
              <li key={menu.id}>
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div css={s.mainImgs}>
          <div css={s.mainImg}><img src="/Main.png" alt="메인 이미지" /></div>
          <div css={s.mainImg}><img src="/main2.png" alt="메인2 이미지" /></div>
          <div css={s.mainImg}><img src="/main3.png" alt="메인3 이미지" /></div>
        </div>
        <div css={s.footer}>
          <p>© MAKE FITNESS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
