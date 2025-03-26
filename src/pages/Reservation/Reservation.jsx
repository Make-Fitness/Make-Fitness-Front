/**@jsxImportSource @emotion/react */
import * as s from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/common/Calendar/Calendar";
import axios from "axios"; 

function Reservation() {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false); 
  const [scheduleColor, setScheduleColor] = useState("#FFC0CB"); 
  const [selectedDate, setSelectedDate] = useState(null); 
  const [form, setForm] = useState({
    membership: "",
  });

  
  useEffect(() => {
    async function fetchMembership() {
      try {
        const response = await axios.get("/api/membership");
        setForm({ membership: response.data.membership });
      } catch (error) {
        console.error("회원권 정보를 불러오는데 실패하였습니다: ", error);
      }
    }
    fetchMembership();
  }, []);

  
  const handleButtonClick = () => {
    setScheduleColor("#FFC0CB"); 
    setShowCalendar(true); 
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleSubmitReservation = async () => {
    if (!selectedDate) {
      alert("예약 날짜를 선택해주세요.");
      return;
    }

    try {
      await axios.post("/api/reservations", {
        date: selectedDate,
        type: "Pilates",
      });
      alert("예약이 완료되었습니다!");
      navigate("/makefitness/mypage");
    } catch (error) {
      alert("예약 실패: " + error.message);
    }
  };

  return (
    <>
      <div css={s.topGroup}>
      <button css={s.button} onClick={handleButtonClick}>
          PT
        </button>
        <button css={s.button} onClick={handleButtonClick}>
          Pilates
        </button>
      </div>
    
      <div css={s.box1}>
        <p>내 예약 정보</p>
      </div>
    
      <div css={s.box2}>
        <label>이용중인 회원권</label>
        <input 
          css={s.input2} 
          type="text" 
          name="" 
          value={form.membership} 
          readOnly 
        />
      </div>
      
      {showCalendar && (
        <div css={s.calendarWrapper}>
          <Calendar
            scheduleColor={scheduleColor}
            onDateSelect={handleDateSelection}
          />
        </div>
      )}
      
      {selectedDate && (
        <div>
          <p>선택한 날짜: {selectedDate}</p>
          <button css={s.button} onClick={handleSubmitReservation}>
            예약 확정
          </button>
        </div>
      )}
      
      <div css={{ marginTop: "2rem", marginBottom: "1rem", textAlign: "center", fontSize: "1.5rem" }}>
        <p>수업 예약은 하루에 한번만 가능합니다.</p>
      </div>
    </>
  );
}

export default Reservation;
