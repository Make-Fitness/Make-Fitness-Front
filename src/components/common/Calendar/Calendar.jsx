/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect } from "react";
import * as s from "./style";
import { css } from "@emotion/react";

function Calendar() {
  
  const [scheduleData, setScheduleData] = useState({}); 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userRole, setUserRole] = useState("ROLE_CUSTOMER");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view"); 
  const [selectedDate, setSelectedDate] = useState(null);
  const scheduleColorDefault = "#87CEEB";

  useEffect(() => {
    const role = localStorage.getItem("roleName") || "ROLE_CUSTOMER";
    setUserRole(role);
  }, []);

  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const titleText = `${year}년 ${formattedMonth}월 스케줄`;
  
  
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const calendarCells = useMemo(() => {
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    return [...blanks, ...dates];
  }, [year, month, firstDay, lastDate]);

  
  const isEditable = () => !(userRole === "ROLE_MANAGER" || userRole === "ROLE_MASTER");

 
  const handleDateClick = (dateNumber) => {
    const dateString = `${year}-${formattedMonth}-${String(dateNumber).padStart(2, "0")}`;
    if (isEditable()) {
      openModal(dateString, "customerAdd");
    } else {
      openModal(dateString, "view");
    }
  };

  
  const openModal = (dateString, modeType) => {
    setSelectedDate(dateString);
    setMode(modeType);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  // 예약 추가(고객 모드)
  const handleSaveSchedule = (newSchedule) => {
    setScheduleData((prev) => {
      const oldList = prev[selectedDate] || [];
      // 중복 시간대 방지
      if (!oldList.some((item) => item.time === newSchedule.time)) {
        return { ...prev, [selectedDate]: [...oldList, newSchedule] };
      }
      return prev;
    });
    closeModal();
  };

  // 날짜 셀 스타일(예약 존재 시 색상)
  const getCellStyle = (dateNumber) => {
    const dateStr = `${year}-${formattedMonth}-${String(dateNumber).padStart(2, "0")}`;
    let style = { position: "relative" };

    // 해당 날짜에 예약 데이터가 있으면
    if (scheduleData[dateStr] && scheduleData[dateStr].length > 0) {
      // 관리자 → 예약 종류에 따라 색상 분기
      if (!isEditable()) {
        const reservationType = scheduleData[dateStr][0].classType;
        if (reservationType === "pt") {
          style.backgroundColor = "#87CEEB";
        } else if (reservationType === "pilates") {
          style.backgroundColor = "#FFC0CB";
        } else {
          style.backgroundColor = scheduleColorDefault;
        }
      } else {
        // 고객이면 무조건 기본 색상
        style.backgroundColor = scheduleColorDefault;
      }
    } else {
      // 예약 없으면 흰색
      style.backgroundColor = "#fff";
    }
    return style;
  };

  // 선택된 날짜의 예약 목록
  const selectedSchedule = selectedDate && scheduleData[selectedDate]
    ? scheduleData[selectedDate]
    : [];

  // 모달 컴포넌트
  const Modal = ({ date, schedule, mode, onClose, onSave }) => {
    // 예시: PT 예약 시 06~24시, 필라테스 예약 시 특정 시간 등...
    const allowedHours = scheduleColorDefault === "#87CEEB"
      ? Array.from({ length: 24 - 6 + 1 }, (_, i) => i + 6)
      : [9, 10, 11, 17, 18, 19, 20, 21];

    const [selectedTime, setSelectedTime] = useState(null);
    const [requestText, setRequestText] = useState("");

    if (mode === "view") {
      return (
        <div css={s.modalOverlay} onClick={onClose}>
          <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{date} 스케줄</h3>
            {schedule && schedule.length > 0 ? (
              <ul>
                {schedule.map((item, idx) => (
                  <li key={idx}>
                    {item.time}:00
                    {item.classType === "pt" ? " (PT)" : item.classType === "pilates" ? " (필라테스)" : ""}
                    {item.request ? ` - ${item.request}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>등록된 스케줄이 없습니다.</p>
            )}
            <div css={s.box}>
              <button css={s.button} onClick={onClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (mode === "customerAdd") {
      return (
        <div css={s.modalOverlay} onClick={onClose}>
          <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{date} 예약 추가</h3>
            <div css={s.timeSlotContainer}>
              {allowedHours.map((hour) => (
                <button
                  key={hour}
                  css={s.button}
                  onClick={() => setSelectedTime(hour)}
                >
                  {hour.toString().padStart(2, "0")}:00
                </button>
              ))}
            </div>
            <div css={s.buttonbox}>
              <button
                css={s.button}
                onClick={() =>
                  onSave({
                    time: selectedTime,
                    request: requestText,
                    classType: "pt", 
                  })
                }
              >
                저장
              </button>
              <button css={s.button} onClick={onClose}>
                취소
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div css={s.calendarAndListWrapper}>
      {/* 달력 영역 */}
      <div css={s.leftWrapper}>
        <div css={s.calendarWrapper}>
          <div css={s.calendarHeader}>
            <button css={s.button} onClick={prevMonth}>
              &lt;
            </button>
            <h2 css={{ fontSize: "2.5rem", fontWeight: "bold", color: "black" }}>{titleText}</h2>
            <button css={s.button} onClick={nextMonth}>
              &gt;
            </button>
          </div>
          <div css={s.calendarGrid}>
            {calendarDays.map((day, i) => {
              const dayColor = i === 0 ? "red" : i === 6 ? "blue" : "#333";
              return (
                <div key={day} css={[s.calendarDayHeader, { color: dayColor }]}>
                  {day}
                </div>
              );
            })}

            {calendarCells.map((dateNum, idx) => {
              if (!dateNum) {
                return <div key={idx} css={s.emptyCell}></div>;
              }
              const dayIndex = idx % 7;
              const dateColor = dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
              const cellStyle = getCellStyle(dateNum);

              return (
                <div
                  key={idx}
                  css={[s.calendarDateCell, { color: dateColor }, cellStyle]}
                  onClick={() => handleDateClick(dateNum)}
                >
                  {dateNum}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {modalOpen && (
        <Modal
          date={selectedDate}
          schedule={selectedSchedule}
          mode={mode}
          onClose={closeModal}
          onSave={handleSaveSchedule}
        />
      )}
    </div>
  );
}

export default Calendar;
