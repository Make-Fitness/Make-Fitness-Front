/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState, useEffect } from 'react';
import HeaderPage from "../../common/HeaderPage/HeaderPage";


function MyPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const roleMapping = {
    "ROLE_CUSTOMER": "customer",
    "ROLE_MANAGER": "manager",
    "ROLE_MASTER": "master",
  };

  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem("role");
    return roleMapping[storedRole] || "anonymous";
  });

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedRole = localStorage.getItem("role");

    if (storedNickname) {
      setNickname(storedNickname);
    }
    if (storedRole) {
      setRole(roleMapping[storedRole] || "");
    }
  }, []);

  return (
    <div>
      <div css={s.root}>
        <div css={s.container}>
          <HeaderPage />
        </div>
        
        <div css={s.containerStyle}>
          <h2>내정보</h2>
          <div css={formStyle}>
            <label css={s.labelStyle} htmlFor="username">이름</label>
            <input css={s.inputStyle} id="username" type="text" placeholder="이름을 입력하세요" />

            <label css={s.labelStyle}>성별</label>
            <div css={s.genderRowStyle}>
              <label>
                <input type="radio" name="gender" value="male" /> 남성
              </label>
              <label>
                <input type="radio" name="gender" value="female" /> 여성
              </label>
            </div>

            <label css={s.labelStyle} htmlFor="phone">전화번호</label>
            <input css={s.inputStyle} id="phone" type="text" placeholder="전화번호 입력" />
            <button css={s.buttonStyle}>변경</button>

            <label css={s.labelStyle} htmlFor="password">비밀번호</label>
            <input css={s.inputStyle} id="password" type="password" placeholder="비밀번호 입력" />

            <label css={s.labelStyle} htmlFor="passwordConfirm">비밀번호 확인</label>
            <input css={s.inputStyle} id="passwordConfirm" type="password" placeholder="비밀번호 재입력" />
            <button css={s.buttonStyle}>변경</button>

            <label css={s.labelStyle} htmlFor="membership">이용중인 회원권</label>
            <input css={s.inputStyle} id="membership" type="text" placeholder="회원권 정보" />

            <button css={s.buttonStyle}>멤버십 변경</button>
            <button css={s.buttonStyle}>회원권 변경</button>
          </div>
        </div>

        <div css={s.footer}>
          <p>© MAKE FITNESS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
