/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function Daymanagement() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [managerId, setManagerId] = useState(null);
  const [classData, setClassData] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  useEffect(() => {
    setManagerId(1);
  }, []);

  useEffect(() => {
    console.log("🟡 Daymanagement useEffect 실행됨");
    const token = localStorage.getItem("accessToken");
    if (!token) return;
  
    axios.get("/api/makefitness/reservation/today", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("🟢 오늘 수업:", res.data);
        setClassData(res.data || []);
      })
      .catch((err) => {
        console.error("🔴 수업 가져오기 실패", err);
      });
  }, []);
  

  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  const todayString = new Date().toISOString().slice(0, 10);

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 관리 (매니저 모드)</h1>
      <p css={s.description}>회원 수업 등록 및 취소 관리, 예약 일정을 캘린더에 표시합니다.</p>

      <div css={s.buttonWrapper}>
        {managerId === 1 && (
          <button
            css={s.button}
            style={{ backgroundColor: selectedClass === "pt" ? "#b71c1c" : "#444" }}
            onClick={() => handleSelectClass("pt")}
          >
            PT
          </button>
        )}
        {managerId === 2 && (
          <button
            css={s.button}
            style={{ backgroundColor: selectedClass === "pilates" ? "#b71c1c" : "#444" }}
            onClick={() => handleSelectClass("pilates")}
          >
            필라테스
          </button>
        )}
      </div>

      <div css={s.contentWrapper}>
        <div css={s.box}>
          <Calendar
            scheduleColor={colorMap[selectedClass]}
            isEditable={true}
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            setCurrentDate={setCurrentDate}
          />
        </div>

        <div css={s.reservationListWrapper}>
          <h5>오늘 스케줄</h5>
          {classData.length === 0 ? (
            <p>오늘은 예약이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {classData.map((item, index) => (
                <li key={index} css={s.reservationItem}>
                  {new Date(item.classTime).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Daymanagement;
