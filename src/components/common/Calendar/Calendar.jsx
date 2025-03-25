/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Calendar = ({ scheduleColor }) => {
  const navigate = useNavigate();

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
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    setScheduleData({});
  }, [year, month]);

  const openModal = (date, modeType) => {
    setSelectedDate(date);
    setMode(modeType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    if (userRole === "ROLE_MANAGER" || userRole === "ROLE_MASTER") {
      openModal(date, "managerAdd");
    } else {
      openModal(date, "customerAdd");
    }
  };

  const handleSaveSchedule = (newSchedule) => {
    setScheduleData((prev) => {
      const prevSchedules = prev[selectedDate] || [];
      if (typeof newSchedule === "number") {
        if (!prevSchedules.includes(newSchedule)) {
          return { ...prev, [selectedDate]: [...prevSchedules, newSchedule] };
        }
      } else if (typeof newSchedule === "object") {
        if (!prevSchedules.some((item) => item.time === newSchedule.time)) {
          return { ...prev, [selectedDate]: [...prevSchedules, newSchedule] };
        }
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

  const Modal = ({ date, schedule, onClose, mode, onSave }) => {
    const formattedDay = date.toString().padStart(2, "0");
    const allowedHours = [9, 10, 11, 17, 18, 19, 20, 21];
    const [selectedTime, setSelectedTime] = useState(null);
    const [maxCapacity, setMaxCapacity] = useState("");
    const [remainingCapacity, setRemainingCapacity] = useState("");
    const [requestText, setRequestText] = useState("");

    if (mode === "view") {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>{year}-{formattedMonth}-{formattedDay} 스케줄</h3>
            {schedule?.length > 0 ? (
              <ul>
                {schedule.map((item, index) => (
                  <li key={index}>
                    {typeof item === "object"
                      ? `${item.time}:00 - ${item.request ?? ""} (최대 ${item.maxCapacity ?? "-"}명 / 남은 ${item.remainingCapacity ?? "-"}명)`
                      : `${item}:00`}
                  </li>
                ))}
              </ul>
            ) : <p>등록된 스케줄이 없습니다.</p>}
            <button css={s.button} onClick={onClose}>닫기</button>
          </div>
        </div>
      );
    }

    if (mode === "managerAdd" && selectedTime === null) {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>{year}-{formattedMonth}-{formattedDay} 수업 선택</h3>
            <div css={s.timeSlotContainer}>
              {allowedHours.map(hour => (
                <button key={hour} css={s.button} onClick={() => setSelectedTime(hour)}>
                  {hour.toString().padStart(2, "0")}:00
                </button>
              ))}
            </div>
          <div css={s.box}>
            <button css={s.button} onClick={onClose}>닫기</button>
          </div>
          </div>
        </div>
      );
    }

    if (mode === "managerAdd" && selectedTime !== null) {
      const label = selectedTime.toString().padStart(2, "0") + ":00";
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>{year}-{formattedMonth}-{formattedDay} 수업 선택</h3>
            <p>선택된 시간: {label}</p>
            <div css = {s.box2}>
              <label>최대 가능 인원:</label>
              <input css={s.modalInput} type="number" min="1" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} />
              <label>남은 인원:</label>
              <input css={s.modalInput} type="number" min="0" value={remainingCapacity} onChange={(e) => setRemainingCapacity(e.target.value)} />
            </div>
            <div css={s.modalButtonContainer}>
              <button css={s.button} onClick={() => onSave({ time: selectedTime, maxCapacity, remainingCapacity })}>저장</button>
              <button css={s.button} onClick={() => setSelectedTime(null)}>시간 다시 선택</button>
              <button css={s.button} onClick={onClose}>취소</button>
            </div>
          </div>
        </div>
      );
    }

    if (mode === "customerAdd" && selectedTime === null) {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>{year}-{formattedMonth}-{formattedDay} 예약 선택</h3>
            <div css={s.timeSlotContainer}>
              {allowedHours.map(hour => (
                <button key={hour} css={s.button} onClick={() => setSelectedTime(hour)}>
                  {hour.toString().padStart(2, "0")}:00
                </button>
              ))}
            </div>
            <div css={s.box}>
              <button css={s.button2} onClick={onClose}>닫기</button>
            </div>
          </div>
        </div>
      );
    }

    if (mode === "customerAdd" && selectedTime !== null) {
      const label = selectedTime.toString().padStart(2, "0") + ":00";
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>{year}-{formattedMonth}-{formattedDay} 예약 선택</h3>
            <p>선택된 시간: {label}</p>
          <div css = {s.box}>
            <input css={s.modalInput} type="text" value={requestText} onChange={(e) => setRequestText(e.target.value)} placeholder="요청사항을 입력하세요" />
          </div>  
            <div css={s.modalButtonContainer}>
              <button css={s.button} onClick={() => onSave({ time: selectedTime, request: requestText })}>저장</button>
              <button css={s.button} onClick={() => setSelectedTime(null)}>시간 다시 선택</button>
              <button css={s.button} onClick={onClose}>취소</button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div css={s.calendarWrapper}>
      <div css={s.calendarHeader}>
        <button css={s.button} onClick={prevMonth}>&lt;</button>
        <h2>{year}년 {formattedMonth}월 스케줄</h2>
        <button css={s.button} onClick={nextMonth}>&gt;</button>
      </div>

      <div css={s.calendarGrid}>
        {calendarDays.map((day, i) => {
          const color = i === 0 ? "red" : i === 6 ? "blue" : "#333";
          return <div key={day} css={[s.calendarDayHeader, { color }]}>{day}</div>;
        })}
        {calendarCells.map((date, idx) => {
          if (!date) return <div key={idx} css={s.emptyCell}></div>;
          const dayIndex = idx % 7;
          const dateColor = dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
          const cellStyle = scheduleData[date]?.length > 0 ? { backgroundColor: scheduleColor } : {};
          return (
            <div key={idx} css={[s.calendarDateCell, { color: dateColor }, cellStyle]} onClick={() => handleDateClick(date)}>
              {date}
            </div>
          );
        })}
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
