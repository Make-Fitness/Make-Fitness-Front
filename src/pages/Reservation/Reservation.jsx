/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function Reservation() {
  
  const [selectedClass, setSelectedClass] = useState("pt");

 
  const [reservations, setReservations] = useState([
    { id: 1, name: "PT 세션", date: "2025-03-29" },
    { id: 2, name: "필라테스 세션", date: "2025-04-01" },
  ]);

  
  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  
  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

 
  const handleCancel = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 예약 페이지</h1>
      <p css={s.description}>
        이곳에서 원하는 강사의 수업을 예약, 예약된 수업 목록 확인이 가능합니다.
      </p>

      
      <div css={s.buttonWrapper}>
        <button
          css={s.button}
          style={{
            backgroundColor: selectedClass === "pt" ? "#b71c1c" : "#444",
          }}
          onClick={() => handleSelectClass("pt")}
        >
          PT
        </button>
        <button
          css={s.button}
          style={{
            backgroundColor: selectedClass === "pilates" ? "#b71c1c" : "#444",
          }}
          onClick={() => handleSelectClass("pilates")}
        >
          필라테스
        </button>
      </div>

      
      <div css={s.contentWrapper}>
        
        <div css={s.box}>
        <Calendar scheduleColor={colorMap[selectedClass]} isEditable={true} />
        </div>
        
        <div css={s.reservationListWrapper}>
          <h2>예약 목록</h2>
          <ul css={s.reservationList}>
            {reservations.map((r, index) => (
              <li css={s.reservationItem} key={r.id}>
                <input type="checkbox" />
                <span>
                  {index + 1}. {r.name} ({r.date})
                </span>
                <button onClick={() => handleCancel(r.id)}>취소</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
