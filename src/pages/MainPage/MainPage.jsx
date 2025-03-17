
/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState } from 'react';
import { MENUS } from '../../constants/menu';

function MainPage(props) {
  const navigate = useNavigate();

  const [role, setRole] = useState("manager");

  return (
    <div css={s.root}>
      <div css={s.container}>
          <div css={s.header}>
            <div css={s.logo}><img src="/logo.png" alt="메인 로고" onClick={() => navigate("/auth")} /></div>
          <div css={s.signinbox}>
            <span css={s.signin} onClick={() => navigate("/auth/signin")}>로그인</span>
            <span css={s.signup} onClick={() => navigate("/auth/signup")}>회원가입</span>
          </div>
          </div>
          <div css={s.navigation}>
            <ul>
              {
                MENUS[role].map(menu => (
                  <Link to={menu.path}><li>{menu.name}</li></Link>
                ))
              }
              
            </ul>
          </div>
          <div css={s.mainImgs}>
            <div css={s.mainImg}><img src="/Main.png" alt="메인 이미지" /></div>
            <div css={s.mainImg}><img src="/main2.png" alt="메인2 이미지" /></div>
            <div css={s.mainImg}><img src="/main3.png" alt="메인2 이미지" /></div>
          </div>
          
          <div css={s.footer}>
            <p>© MAKE FITNESS. All rights reserved.</p>
          </div>
      </div>
    </div>
  );
}

export default MainPage;