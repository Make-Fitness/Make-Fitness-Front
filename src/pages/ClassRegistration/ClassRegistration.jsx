/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function ClassRegistration() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");

  
  const [managerId, setManagerId] = useState(null);
  useEffect(() => {
    fetch("/api/manager")
      .then((res) => res.json())
      .then((data) => setManagerId(data.id))
      .catch((error) => console.error("매니저 ID 불러오기 실패", error));
  }, []);

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  useEffect(() => {
    if (Object.keys(scheduleData).length > 0) {
      fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      })
        .then((response) => response.json())
        .then((data) => console.log("예약 내역 전송 성공", data))
        .catch((error) => console.error("예약 내역 전송 실패", error));
    }
  }, [scheduleData]);

  const handleCancel = (day, time) => {
    setScheduleData((prev) => {
      const daySchedules = prev[day];
      if (!daySchedules) return prev;
      const updatedDaySchedules = daySchedules.filter(
        (item) => item.time !== time
      );
      return { ...prev, [day]: updatedDaySchedules };
    });
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 등록</h1>
      <p css={s.description}>내 회원 수업 등록 및 취소를 관리합니다.</p>

      <div css={s.buttonWrapper}>
       
        {managerId === 1 && (
          <button
            css={s.button}
            style={{
              backgroundColor: selectedClass === "pt" ? "#b71c1c" : "#444",
            }}
            onClick={() => handleSelectClass("pt")}
          >
            PT
          </button>
        )}
        {managerId === 2 && (
          <button
            css={s.button}
            style={{
              backgroundColor:
                selectedClass === "pilates" ? "#b71c1c" : "#444",
            }}
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
          <h3>내 일정</h3>
          {Object.keys(scheduleData).length === 0 ? (
            <p>예약이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {Object.keys(scheduleData)
                .sort((a, b) => a - b)
                .map((day) =>
                  scheduleData[day].map((item, idx) => (
                    <li key={`${day}-${idx}`} css={s.reservationItem}>
                      {year}-{formattedMonth}-{day} : {item.time}:00
                      {item.instructor ? `, 강사: ${item.instructor}` : ""}
                      {item.request ? `, 요청사항: ${item.request}` : ""}
                      <button
                        css={s.button}
                        style={{ marginLeft: "1rem" }}
                        onClick={() => handleCancel(day, item.time)}
                      >
                        수강취소
                      </button>
                    </li>
                  ))
                )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassRegistration;
