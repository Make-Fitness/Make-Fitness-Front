/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const [scheduleData, setScheduleData] = useState({});

  // 출석 내역 조회 함수
  const loadAttendance = async (accessToken) => {
    try {
      const res = await axios.get("/api/makefitness/attendance/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // attendDate가 ISO 문자열로 오는 경우 그대로 사용
      const attendDates = res.data.map((item) => item.attendDate);
      console.log("출석한 날짜 목록:", attendDates);

      const calendarData = {};
      [...new Set(attendDates)].forEach((date) => {
        calendarData[date] = "red";
      });

      setScheduleData(calendarData);
    } catch (err) {
      console.error("출석 정보 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    const nickname = localStorage.getItem("nickname") || "";
    const ph = localStorage.getItem("ph") || "";
    const roleName = localStorage.getItem("roleName") || "";
    const accessToken = localStorage.getItem("accessToken");

    setForm((prev) => ({
      ...prev,
      name: nickname,
      ph: ph,
      classstatus: roleName,
    }));

    if (!accessToken) {
      console.log("AccessToken 없음");
      return;
    }

    // 출석 내역만 불러옴
    loadAttendance(accessToken);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
  
      // 실제 서버로 비밀번호 변경 요청이 필요하다면 여기서 처리
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } else {
      alert(`${type}이(가) 변경되었습니다.`);
    }
  };

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
          readOnly
        />

        <label>전화번호</label>
        <div css={s.numbercontainer}>
          <input 
            css={s.input}
            type="text"
            name="ph"
            value={form.ph}
            readOnly
          />
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate("비밀번호");
              }
            }}
          />
          <button css={s.button2} onClick={() => handleUpdate("비밀번호")}>
            변경
          </button>
        </div>
      </div>

      <div css={s.calendarWrapper}>
        <Calendar
          isEditable={false}
          scheduleData={scheduleData}
          setScheduleData={setScheduleData}
        />
      </div>
    </div>
  );
}

export default MyPage;
