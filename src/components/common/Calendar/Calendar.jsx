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

  // 사용자 역할 상태
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

  
  const handleDateClick = (date) => {
    
    if (!isEditable) {
      openModal(date, "view");
      return;
    }
    
    if (scheduleColor === "#87CEEB") {
      const existing = scheduleData[date];
      if (existing && existing.length > 0) {
        alert("이미 예약된 날입니다. 하루에 한 번만 예약할 수 있습니다.");
        return;
      }
    }
   
    if (userRole === "ROLE_MANAGER" || userRole === "ROLE_MASTER") {
      openModal(date, "managerAdd");
    } else {
      openModal(date, "customerAdd");
    }
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

  
  const allowedHours =
    scheduleColor === "#87CEEB"
      ? Array.from({ length: 24 - 6 + 1 }, (_, i) => i + 6)
      : [9, 10, 11, 17, 18, 19, 20, 21];

  const Modal = ({ date, schedule, onClose, mode, onSave }) => {
    const formattedDay = date.toString().padStart(2, "0");
    const [selectedTime, setSelectedTime] = useState(null);
    const [requestText, setRequestText] = useState("");
    const [customerStep, setCustomerStep] = useState(0);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const instructors = ["박재훈", "장성엽", "강두혁", "신소영"];

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
                    {item.instructor ? ` (${item.instructor})` : ""}
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
    } else if (mode === "managerAdd") {
      
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>
              {year}-{formattedMonth}-{formattedDay} 수업 추가
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
            
            <button
              css={s.button}
              onClick={() => onSave({ time: selectedTime })}
            >
              저장
            </button>
            <button css={s.button} onClick={onClose}>
              취소
            </button>
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
                onClick={() => onSave({ time: selectedTime, request: requestText })}
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
            const cellStyle =
              scheduleData[date]?.length > 0
                ? { backgroundColor: scheduleColor }
                : {};
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

      {/* 모달 */}
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
