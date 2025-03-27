/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Calendar = ({
  scheduleColor,
  isEditable,
  scheduleData,
  setScheduleData,
  setCurrentDateFromParent,
}) => {
  const navigate = useNavigate();

  // 사용자 역할 상태 (ROLE_MANAGER/ROLE_MASTER: 매니저 모드)
  const [userRole, setUserRole] = useState("ROLE_CUSTOMER");
  useEffect(() => {
    const role = localStorage.getItem("roleName") || "ROLE_CUSTOMER";
    setUserRole(role);
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
    if (setCurrentDateFromParent) setCurrentDateFromParent(newDate);
  };
  const nextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setCurrentDate(newDate);
    if (setCurrentDateFromParent) setCurrentDateFromParent(newDate);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);

  // 매니저 모드에서는 편집이 아닌 조회 모드로 모달 오픈
  const handleDateClick = (date) => {
    if (!isEditable || userRole === "ROLE_MANAGER" || userRole === "ROLE_MASTER") {
      openModal(date, "view");
      return;
    }
    // 일반 고객 예약 추가 로직
    openModal(date, "customerAdd");
  };

  const openModal = (date, modeType) => {
    setSelectedDate(date);
    setMode(modeType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleSaveSchedule = (newSchedule) => {
    setScheduleData((prev) => {
      const prevSchedules = prev[selectedDate] || [];
      if (!prevSchedules.some((item) => item.time === newSchedule.time)) {
        return {
          ...prev,
          [selectedDate]: [...prevSchedules, newSchedule],
        };
      }
      return prev;
    });
    closeModal();
  };

  const generateCalendar = () => {
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    return [...blanks, ...dates];
  };

  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const calendarCells = generateCalendar();

  // 예약 추가 시 사용할 시간 슬롯 (일반 고객 모드용)
  const allowedHours =
    scheduleColor === "#87CEEB"
      ? Array.from({ length: 24 - 6 + 1 }, (_, i) => i + 6)
      : [9, 10, 11, 17, 18, 19, 20, 21];

  const Modal = ({ date, schedule, onClose, mode, onSave }) => {
    // 날짜를 두 자리 문자열로 변환
    const formattedDay = date.toString().padStart(2, "0");
    const [selectedTime, setSelectedTime] = useState(null);
    const [requestText, setRequestText] = useState("");
    // 관리자 모드에서는 단순 조회만 하므로 추가 입력은 생략

    if (mode === "view") {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>
              {year}-{formattedMonth}-{formattedDay} 스케줄
            </h3>
            {schedule?.length > 0 ? (
              <ul>
                {schedule.map((item, index) => (
                  <li key={index}>
                    {item.time}:00
                    {item.classType
                      ? ` (${item.classType === "pt" ? "PT" : "필라테스"})`
                      : ""}
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
    } else if (mode === "customerAdd") {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>
              {year}-{formattedMonth}-{formattedDay} 예약 추가
            </h3>
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
            <input
              css={s.modalInput}
              type="text"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="요청사항을 입력하세요"
            />
            <div css={s.buttonbox}>
              <button
                css={s.button}
                onClick={() =>
                  onSave({
                    time: selectedTime,
                    request: requestText,
                    classType: "pt", // 예시: 고객이 예약할 경우 PT로 고정 (필요 시 수정)
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
    } else {
      return null;
    }
  };

  return (
    <div css={s.calendarAndListWrapper}>
      <div css={s.calendarWrapper}>
        <div css={s.calendarHeader}>
          <button css={s.button} onClick={prevMonth}>
            &lt;
          </button>
          <h2>
            {year}년 {formattedMonth}월 스케줄
          </h2>
          <button css={s.button} onClick={nextMonth}>
            &gt;
          </button>
        </div>
        <div css={s.calendarGrid}>
          {calendarDays.map((day, i) => {
            const color = i === 0 ? "red" : i === 6 ? "blue" : "#333";
            return (
              <div key={day} css={[s.calendarDayHeader, { color }]}>
                {day}
              </div>
            );
          })}
          {calendarCells.map((date, idx) => {
            if (!date) return <div key={idx} css={s.emptyCell}></div>;
            const dayIndex = idx % 7;
            const dateColor =
              dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
            let cellStyle = {};
            if (scheduleData[date]?.length > 0) {
              
              if (userRole === "ROLE_MANAGER" || userRole === "ROLE_MASTER") {
                const reservationType = scheduleData[date][0].classType;
                cellStyle = {
                  backgroundColor:
                    reservationType === "pt"
                      ? "#87CEEB"
                      : reservationType === "pilates"
                      ? "#FFC0CB"
                      : scheduleColor,
                };
              } else {
                cellStyle = { backgroundColor: scheduleColor };
              }
            }
            return (
              <div
                key={idx}
                css={[s.calendarDateCell, { color: dateColor }, cellStyle]}
                onClick={() => handleDateClick(date)}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>
      {modalOpen && (
        <Modal
          date={selectedDate}
          schedule={scheduleData[selectedDate]}
          onClose={closeModal}
          mode={mode}
          onSave={handleSaveSchedule}
        />
      )}
    </div>
  );
};

export default Calendar;
