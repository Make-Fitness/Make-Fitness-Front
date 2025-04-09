/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "./style";

function MasterMyPage() {
  // 폼 데이터 (이름, 전화번호, 비밀번호 등)
  const [form, setForm] = useState({
    name: "",
    ph: "",
    password: "",
    confirmPassword: "",
    classstatus: "",
  });

  // 출석용 전화번호 입력 상태
  const [inputPhone, setInputPhone] = useState("");

  // 출석 입력 모달 상태
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  // 컴포넌트 마운트 시 로컬스토리지에서 유저 정보 불러오기
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

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 비밀번호 or 전화번호 변경 처리 (기능 연결 예정 시 확장)
  const handleUpdate = (type) => {
    if (type === "비밀번호") {
      if (!form.password || !form.confirmPassword) {
        alert("비밀번호를 모두 입력해주세요.");
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } else {
      alert(`${type}이(가) 변경되었습니다.`);
    }
  };

  // 출석 등록 처리 (전화번호로 유저 조회 후 출석 등록 요청)
  const handleAttendance = async () => {
    const phone = inputPhone.trim();
    if (!phone) return alert("전화번호를 입력해주세요.");

    const token = localStorage.getItem("accessToken");
    const adminName = localStorage.getItem("nickname");
    
    try {
      // 전화번호로 사용자 ID 조회
      const resolveRes = await axios.get("/api/makefitness/attendance/resolve-user", {
        params: { ph: phone },
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = resolveRes.data.userId;

      // 출석 요청 페이로드
      const payload = {
        username: `${adminName} 등록`,
        ph: phone,
      };

      // 출석 등록 요청
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

  // UI 렌더링
  return (
    <div css={s.topcon}>
      <div css={s.expandedContainer}>
        <h2>내정보</h2>

        {/* 이름: 읽기 전용 */}
        <label>이름</label>
        <input type="text" name="name" value={form.name} readOnly />

        {/* 전화번호: 수정 가능 */}
        <label>전화번호</label>
        <input type="text" name="ph" value={form.ph} onChange={handleChange} />
        <button css={s.button2} onClick={() => handleUpdate("전화번호")}>변경</button>

        {/* 비밀번호 입력 */}
        <label>비밀번호</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />

        {/* 비밀번호 확인 입력 + 변경 버튼 */}
        <label>비밀번호 확인</label>
        <div css={s.passwordcon}>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate("비밀번호");
            }}
          />
          <button css={s.button2} onClick={() => handleUpdate("비밀번호")}>변경</button>
        </div>

        {/* 출석 등록 버튼 */}
        <div css={s.attendanceBtnWrapper}>
          <button css={s.attendanceBtn} onClick={() => setIsPhoneModalOpen(true)}>
            출석체크
          </button>
        </div>
      </div>

      {/* 출석 전화번호 입력 모달 */}
      {isPhoneModalOpen && (
        <div css={s.modalOverlay}>
          <div css={s.modalBox}>
            <h3>출석할 회원의 전화번호를 입력하세요</h3>
            <input
              css={s.input}
              type="text"
              placeholder="전화번호 입력"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAttendance();
              }}
            />
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
