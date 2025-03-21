/**@jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import HeaderPage from "../../common/HeaderPage/HeaderPage";

function MyPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    membership: ""
  });

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) setForm((prev) => ({ ...prev, name: storedNickname }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (type) => {
    alert(`${type}이(가) 변경되었습니다.`);
  };

  return (
    <div>
    <div css={s.root}>
      <div css={s.container}>
        <HeaderPage />
    </div>
      <div css ={s.topcon}>
        <div css={s.maincontainer}>
          <h2>내정보</h2>
            <label>이름</label>
            <input css={s.input} type="text" name="name" value={form.name} onChange={handleChange} />
          
          
            <label>전화번호</label>
          <div css={s.numbercontainer}>
            <input css={s.input} type="text" name="phone" value={form.phone} onChange={handleChange} />
            <button css={s.button2} onClick={() => handleUpdate("전화번호")}>변경</button>
          </div>
          
            <label>비밀번호</label>
                    
          <input css={s.input} type="password" name="password" value={form.password} onChange={handleChange} />
          <label>비밀번호 확인</label>
          <div css={s.passwordcon}>
            <input css={s.input} type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            <button css={s.button2} onClick={() => handleUpdate("비밀번호")}>변경</button>
          </div>
          <label>이용중인 회원권</label>
          <input css={s.input2} type="text" name="membership" value={form.membership} onChange={handleChange} />
          <div css={s.buttonContainer}>
            <button css={s.button} onClick={() => handleUpdate("멤버십")}>멤버십 변경</button>
            <button css={s.button} onClick={() => handleUpdate("회원권")}>회원권 변경</button>
            </div>
        </div>
        </div>
      </div>
      <div css={s.footer}>
        <p>© MAKE FITNESS. All rights reserved.</p>
      </div>
    </div>
   
  );
}

export default MyPage;