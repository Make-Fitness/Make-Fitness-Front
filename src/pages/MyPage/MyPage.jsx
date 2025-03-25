/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function MyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    ph: "",
    password: "",
    confirmPassword: "",
    classstatus: "",
  });

  useEffect(() => {
    // localStorage에서 로그인 시 저장된 사용자 정보 땡김김
    const nickname = localStorage.getItem("nickname") || "";
    const ph = localStorage.getItem("ph") || "";
    const classstatus = localStorage.getItem("classstatus") || "";
    setForm((prev) => ({
      ...prev,
      name: nickname,
      ph: ph,
      classstatus: classstatus,
    }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (type) => {
    alert(`${type}이(가) 변경되었습니다.`);
    // 실제 업데이트 API 연동 로직 추가 가능
  };

  const handleUpdate2 = (type) => {
    alert(`${type} 페이지로 이동합니다.`);
    if (type === "멤버십" || type === "회원권") {
      navigate("/makefitness/membership");
    }
  };

  
  const classstatusValue = form.classstatus.trim().toLowerCase();
  const scheduleColor =
    classstatusValue === "pt"
      ? "#87CEEB"
      : classstatusValue === "pilates"
      ? "#FFC0CB"
      : "#87CEEB";

  return (
    <div css={s.topcon}>
      <div css={s.maincontainer}>
        <h2>내정보</h2>

        <label>이름</label>
        <input
          css={s.input}
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label>전화번호</label>
        <div css={s.numbercontainer}>
          <input
            css={s.input}
            type="text"
            name="ph"
            value={form.ph}
            onChange={handleChange}
          />
          <button css={s.button2} onClick={() => handleUpdate("전화번호")}>
            변경
          </button>
        </div>

        <label>비밀번호</label>
        <input
          css={s.input}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <label>비밀번호 확인</label>
        <div css={s.passwordcon}>
          <input
            css={s.input}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <button css={s.button2} onClick={() => handleUpdate("비밀번호")}>
            변경
          </button>
        </div>

        <label>이용중인 회원권</label>
        <input
          css={s.input2}
          type="text"
          name="classstatus"
          value={form.classstatus}
          readOnly
        />

        <div css={s.buttonContainer}>
          <button css={s.button} onClick={() => handleUpdate2("멤버십")}>
            멤버십 변경
          </button>
          <button css={s.button} onClick={() => handleUpdate2("회원권")}>
            회원권 변경
          </button>
        </div>
      </div>

      <div css={s.calendarWrapper}>
        <Calendar scheduleColor={scheduleColor} />
      </div>
    </div>
  );
}

export default MyPage;
