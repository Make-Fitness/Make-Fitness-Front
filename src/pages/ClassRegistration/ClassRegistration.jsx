/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { css } from "@emotion/react";



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

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  
  const handleDateClick = (date) => {
    // date 형식은 백엔드에서 사용하는 스케줄 key와 동일하게 맞춰야 함
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  
  const selectedDaySchedule =
    selectedDate && scheduleData[selectedDate]
      ? scheduleData[selectedDate]
      : [];

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 등록 (매니저 모드)</h1>
      <p css={s.description}>
        회원 수업 등록 및 취소 관리, 예약 일정을 캘린더에 표시합니다.
      </p>

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
              backgroundColor: selectedClass === "pilates" ? "#b71c1c" : "#444",
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
            onDateClick={handleDateClick} 
          />
        </div>

        <div css={s.reservationListWrapper}>
          <h3>내 오늘 전체 스케줄</h3>
          <ul css={s.reservationList}>
            {Object.entries(scheduleData).map(([day, reservations]) =>
              reservations.map((reservation, index) => (
                <li key={`${day}-${index}`} css={s.reservationItem}>
                  <span>{`${day} ${reservation.time}`}</span>
                  <button onClick={() => handleCancel(day, reservation.time)}>
                    취소
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>


      {isModalOpen && (
        <div css={modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedDate} 일정</h2>
            {selectedDaySchedule.length > 0 ? (
              <ul>
                {selectedDaySchedule.map((reservation, index) => (
                  <li key={index}>
                    <span>{reservation.time}</span>
                    <button
                      onClick={() =>
                        handleCancel(selectedDate, reservation.time)
                      }
                    >
                      취소
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>예약된 일정이 없습니다.</p>
            )}
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassRegistration;
