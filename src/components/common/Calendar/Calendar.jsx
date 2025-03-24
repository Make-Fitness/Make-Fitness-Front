/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const navigate = useNavigate();

 
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "customer";
    setUserRole(role);
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, '0');

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
    if (userRole === "trainer" || userRole === "master") {
      
      openModal(date, "add");
    } else {
      
      openModal(date, "view");
    }
  };

  
  const handleSaveSchedule = (newSchedule) => {
    setScheduleData((prev) => ({
      ...prev,
      [selectedDate]: newSchedule,
    }));
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
    
    const formattedDay = date.toString().padStart(2, '0');

    
    const [inputValue, setInputValue] = useState(schedule || "");

    return (
      <div css={s.modalOverlay}>
        <div css={s.modalContent}>
          <h3>
            {year}-{formattedMonth}-{formattedDay} Schedule
          </h3>

          {mode === "view" ? (
            
            <>
              <p>{schedule ? schedule : "등록된 Schedule이 없습니다."}</p>
              <button css={s.button} onClick={onClose}>
                닫기
              </button>
            </>
          ) : (
            
            <>
              <input
                css={s.modalInput}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="스케줄을 입력하세요"
              />
              <div css={s.modalButtonContainer}>
                <button
                  css={s.button}
                  onClick={() => onSave(inputValue)}
                >
                  저장
                </button>
                <button css={s.button} onClick={onClose}>
                  취소
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div css={s.calendarWrapper}>
      <div css={s.calendarHeader}>
        <button css={s.button} onClick={prevMonth}>
          &lt;
        </button>
        <h2>
          {year}년 {formattedMonth}월 Schedule
        </h2>
        <button css={s.button} onClick={nextMonth}>
          &gt;
        </button>
      </div>

      <div css={s.calendarGrid}>
        {calendarDays.map((day, i) => {
          let dayColor = "#333";
          if (i === 0) dayColor = "red";
          if (i === 6) dayColor = "blue";
          return (
            
            <div
              key={day}
              css={[
                s.calendarDayHeader,
                { color: dayColor, fontSize: "1.3rem" },
              ]}
            >
              {day}
            </div>
          );
        })}

        {calendarCells.map((date, idx) => {
          if (!date) {
            return <div key={idx} css={s.emptyCell}></div>;
          }
          const dayIndex = (firstDay + idx) % 7;
          let dateColor = "black";
          if (dayIndex === 6) dateColor = "red";
          if (dayIndex === 5) dateColor = "blue";

         
          const cellStyle = scheduleData[date]
            ? { backgroundColor: "#87CEEB" }
            : {};

          return (
            <div
              key={idx}
              css={[
                s.calendarDateCell,
                { color: dateColor, fontSize: "1.5rem" },
                cellStyle,
              ]}
              onClick={() => handleDateClick(date)}
            >
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
