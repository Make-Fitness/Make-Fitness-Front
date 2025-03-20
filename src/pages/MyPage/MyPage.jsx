/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState } from 'react';
import { MENUS } from "../../constants/menu";

function MyPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");

  return (
    <div css={s.root}>
      <div css={s.container}>
        <div css={s.header}>
          <div css={s.logo}>
            <img src="/main/logo.png" alt="메인 로고" onClick={() => navigate("/auth")} />
          </div>
          <div css={s.signinbox}>
            <span css={s.signin} onClick={() => navigate("/auth/signin")}>로그인</span>
            <span css={s.signup} onClick={() => navigate("/auth/signup")}>회원가입</span>
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
        <div css={s.formContainer}>
          <h1>내 정보 변경</h1>
          <label htmlFor="username">이름</label>
          <input id="username" type="text" placeholder="이름을 입력하세요" />

          <label>성별</label>
          <div css={s.genderRow}>
            <label>
              <input type="radio" name="gender" value="male" />
              남성
            </label>
            <label>
              <input type="radio" name="gender" value="female" />
              여성
            </label>
          </div>

          <label htmlFor="password">변경 비밀번호</label>
          <input id="password" type="text" placeholder="변경할 비밀번호를 입력하세요." />

          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input id="passwordConfirm" type="text" placeholder="변경할 비밀번호를 재입력하세요." />

          <label htmlFor="membership">현재 이용중인 회원권</label>
          <input id="membership" type="text" placeholder="." />

          <label htmlFor="Nextpaymentdate">다음 결제일</label>
          <input id="Nextpaymentdate" type="text" placeholder="." />
        </div>
      </div>

      <div css={s.footer}>
        <p>© MAKE FITNESS. All rights reserved.</p>
      </div>
    </div>
);
}

export default MyPage;
