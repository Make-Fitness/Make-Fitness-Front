/**@jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useState } from 'react';
import HeaderPage from "../../common/HeaderPage/HeaderPage";
import { useEffect } from "react";

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
      setRole(roleMapping[storedRole] || "anonymous");
    }
  }, []);

return (
  
    <div>
      <div css={s.root}>
        <div css={s.container}>
          <HeaderPage />
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
