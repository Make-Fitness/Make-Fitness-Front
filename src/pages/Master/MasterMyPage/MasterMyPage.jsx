/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "./style";

function MasterMyPage() {
  const [form, setForm] = useState({
    name: "",
    ph: "",
    password: "",
    confirmPassword: "",
    classstatus: "",
  });

  const [inputPhone, setInputPhone] = useState("");
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  useEffect(() => {
    const nickname = localStorage.getItem("nickname") || "";
    const ph = localStorage.getItem("ph") || "";
    const roleName = localStorage.getItem("roleName") || "";

    setForm((prev) => ({
      ...prev,
      name: nickname,
      ph: ph,
      classstatus: roleName,
    }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (type) => {
    alert(`${type}이(가) 변경되었습니다.`);
  };

  const handleAttendance = async () => {
    const phone = inputPhone.trim();
    if (!phone) return alert("전화번호를 입력해주세요.");

    const token = localStorage.getItem("accessToken");
    const adminName = localStorage.getItem("nickname") || "관리자";

    try {
      const resolveRes = await axios.get("/api/makefitness/attendance/resolve-user", {
        params: { ph: phone },
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = resolveRes.data.userId;
      const payload = {
        username: `${adminName} 등록`,
        ph: phone,
      };

      await axios.post(`/api/makefitness/attendance/users/${userId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("출석이 정상적으로 처리되었습니다.");
      setInputPhone("");
      setIsPhoneModalOpen(false);
    } catch (error) {
      const msg = error.response?.data;
      if (msg === "존재하지 않는 전화번호입니다.") {
        alert("해당 전화번호의 회원을 찾을 수 없습니다.");
      } else if (msg === "이미 오늘 출석한 회원입니다.") {
        alert("이미 오늘 출석한 회원입니다.");
      } else {
        alert("출석 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div css={s.topcon}>
      <div css={s.expandedContainer}>
        <h2>내정보</h2>

        <label>이름</label>
        <input type="text" name="name" value={form.name} readOnly />

        <label>전화번호</label>
        <input type="text" name="ph" value={form.ph} onChange={handleChange} />
        <button css={s.button2} onClick={() => handleUpdate("전화번호")}>변경</button>

        <label>비밀번호</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />

        <label>비밀번호 확인</label>
        <div css={s.passwordcon}>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
          <button css={s.button2} onClick={() => handleUpdate("비밀번호")}>변경</button>
        </div>

        <div css={s.attendanceBtnWrapper}>
          <button css={s.attendanceBtn} onClick={() => setIsPhoneModalOpen(true)}>출석체크</button>
        </div>
      </div>

      {isPhoneModalOpen && (
        <div css={s.modalOverlay}>
          <div css={s.modalBox}>
            <h3>출석할 회원의 전화번호를 입력하세요</h3>
            <input css={s.input} type="text" placeholder="전화번호 입력" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} />
            <div css={s.modalBtnGroup}>
              <button css={s.button2} onClick={handleAttendance}>출석</button>
              <button css={s.button2} onClick={() => setIsPhoneModalOpen(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MasterMyPage;