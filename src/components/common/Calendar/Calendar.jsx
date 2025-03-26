/**@jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import axios from "axios"; 

const Calendar = ({ scheduleColor }) => {
  const [userRole, setUserRole] = useState("ROLE_CUSTOMER");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  
  const [requestText, setRequestText] = useState("");
  // (추가) IME 조합 중인지 여부
  const [isComposing, setIsComposing] = useState(false);
  // 회원권 정보
  const [membership, setMembership] = useState("");

  // IME 한글 입력 시 처리할 이벤트 핸들러
  const handleRequestTextChange = (e) => {
    // 조합 중이 아닐 때만 상태 업데이트
    if (!isComposing) {
      setRequestText(e.target.value);
    }
  };
  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    // 조합 완료 후 최종 텍스트 반영
    setRequestText(e.target.value);
  };

  useEffect(() => {
    const role = localStorage.getItem("roleName") || "ROLE_CUSTOMER";
    setUserRole(role);
  }, []);

  useEffect(() => {
    async function fetchMembership() {
      try {
        const response = await axios.get("/api/membership");
        setMembership(response.data.membership);
      } catch (error) {
        console.error("회원권 정보를 불러오는데 실패했습니다: ", error);
      }
    }
    fetchMembership();
  }, []);

  // 달력이 바뀔 때마다 예약 정보 불러오기
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    axios
      .get(`/api/reservations?year=${year}&month=${month}`)
      .then((response) => {
        const data = response.data;
        const newScheduleData = {};
        data.forEach((reservation) => {
          if (!newScheduleData[reservation.date]) {
            newScheduleData[reservation.date] = [];
          }
          newScheduleData[reservation.date].push(reservation);
        });
        setScheduleData(newScheduleData);
      })
      .catch((error) => {
        console.error("예약 데이터를 불러오는 중 오류 발생:", error);
      });
  }, [currentDate]);

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

  const generateCalendar = () => {
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    return [...blanks, ...dates];
  };

  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const calendarCells = generateCalendar();

  const openModal = (date, modeType) => {
    setSelectedDate(date);
    setMode(modeType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setRequestText("");
  };

  const handleDateClick = (date) => {
    if (userRole === "ROLE_MANAGER" || userRole === "ROLE_MASTER") {
      openModal(date, "managerAdd");
    } else {
      openModal(date, "customerAdd");
    }
  };

  const handleSaveSchedule = () => {
    if (!selectedTime) {
      alert("시간을 선택해 주세요.");
      return;
    }

    const schedule = { time: selectedTime, request: requestText };
    axios
      .post("/api/reservations", {
        date: selectedDate,
        time: selectedTime,
        request: requestText,
      })
      .then(() => {
        alert("예약이 저장되었습니다.");
        setScheduleData((prev) => ({
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), schedule],
        }));
        closeModal();
      })
      .catch((error) => {
        alert("예약 저장에 실패했습니다.");
        console.log(error);
      });
  };

  const Modal = ({ onClose }) => {
    const allowedHours = [9, 10, 11, 17, 18, 19, 20, 21];

    if (mode === "view") {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>
              {year}-{formattedMonth}-{selectedDate} 예약 내역
            </h3>
            {scheduleData[selectedDate] && scheduleData[selectedDate].length > 0 ? (
              <ul>
                {scheduleData[selectedDate].map((item, index) => (
                  <li key={index}>
                    {item.time}:00 - {item.request}
                  </li>
                ))}
              </ul>
            ) : (
              <p>예약된 내역이 없습니다.</p>
            )}
            <button css={s.button} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      );
    }

    if (mode === "customerAdd" || mode === "managerAdd") {
      return (
        <div css={s.modalOverlay}>
          <div css={s.modalContent}>
            <h3>
              {year}-{formattedMonth}-{selectedDate} 예약
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
            {selectedTime && (
              <>
                <div css={s.box2}>
                  <label>요청 사항</label>
                </div>
                <input
                  css={s.modalInput}
                  type="text"
                  value={requestText}
                  //연속타자가능
                  onChange={handleRequestTextChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  placeholder="예약 요청 사항을 입력하세요."
                />
                <div css={s.modalButtonContainer}>
                  <button css={s.button} onClick={handleSaveSchedule}>
                    저장
                  </button>
                  <button
                    css={s.button}
                    onClick={() => setSelectedTime(null)}
                  >
                    시간 다시 선택
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
    }
  };

  return (
    <div css={s.calendarWrapper}>
      <div css={s.calendarHeader}>
        <button css={s.button} onClick={prevMonth}>
          {"<"}
        </button>
        <h2>
          {year}년 {formattedMonth}월
        </h2>
        <button css={s.button} onClick={nextMonth}>
          {">"}
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
            scheduleData[date]?.length > 0 ? { backgroundColor: scheduleColor } : {};

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

      {modalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Calendar;
