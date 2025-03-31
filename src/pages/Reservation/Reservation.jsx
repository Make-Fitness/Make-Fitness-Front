/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function Reservation() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");

  
  const [instructorId, setInstructorId] = useState(null);

  
  useEffect(() => {
    fetch("/api/instructor")
      .then((res) => res.json())
      .then((data) => setInstructorId(data.id))
      .catch((error) => console.error("강사 ID 불러오기 실패", error));
  }, []);

  
  const instructorImageMap = {
    1: "../Trainer/park.jpeg",
    2: "../Trainer/jang.jpg",
    3: "../Trainer/kang.jpg",
    4: "../Trainer/shin.jpg",
    5: "../Trainer/kim.jpg",
  };

 
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

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 예약 페이지</h1>
      <p css={s.description}>
        이곳에서 내 트레이너의 스케줄 확인 및 나의 예약된 수업 확인이 가능합니다.
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
          <div css={s.leftPane}>
          <h2 css={s.subtitle}>담당 강사</h2>
          <div css={s.instructorPhotoContainer}>
            {instructorId && instructorImageMap[instructorId] ? (
              <img
                css={s.instructorPhotoPreview}
                src={instructorImageMap[instructorId]}
                alt="강사 사진"
              />
            ) : (
              <div css={s.instructorPhotoPlaceholder}>사진 미리보기</div>
            )}
          </div>
        </div>

        
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
          <h3>내 예약 목록</h3>
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

export default Reservation;
