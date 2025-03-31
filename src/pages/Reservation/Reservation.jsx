/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { css } from "@emotion/react";

function Reservation() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [instructorId, setInstructorId] = useState(null);

  // 오늘 날짜 정보
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dayToday = currentDate.getDate();
  const formattedMonth = month.toString().padStart(2, "0");

  // 강사 사진 매핑
  const instructorImageMap = {
    1: "../Trainer/park.jpeg",
    2: "../Trainer/jang.jpg",
    3: "../Trainer/kang.jpg",
    4: "../Trainer/shin.jpg",
    5: "../Trainer/kim.jpg",
  };

  // 수업 타입별 색상 매핑
  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  // 강사 정보 가져오기
  useEffect(() => {
    fetch("/api/class_subject_td")
      .then((res) => res.jwt())
      .then((data) => setInstructorId(data.id))
      .catch((error) => console.error("강사 ID 불러오기 실패", error));
  }, []);

  // 수업 타입 선택 핸들러
  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  // 예약 데이터 변경 시 서버로 전송 (예시)
  useEffect(() => {
    if (Object.keys(scheduleData).length > 0) {
      fetch("/api/class_subject_td", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      })
        .then((response) => response.jwt())
        .then((data) => console.log("예약 내역 전송 성공", data))
        .catch((error) => console.error("예약 내역 전송 실패", error));
    }
  }, [scheduleData]);

  // 예약 취소 핸들러
  const handleCancel = (day, idx) => {
    setScheduleData((prev) => {
      const updated = { ...prev };
      updated[day] = updated[day].filter((_, i) => i !== idx);
      if (updated[day].length === 0) {
        delete updated[day];
      }
      return updated;
    });
  };

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
        {/* 강사 영역 */}
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

        {/* 캘린더 영역 */}
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
          <h3>오늘 스케줄 (매니저 모드)</h3>
          {Object.keys(scheduleData).filter(
            (d) => parseInt(d, 10) === dayToday
          ).length === 0 ? (
            <p>오늘은 예약이 없습니다.</p>
          ) : (
            Object.keys(scheduleData)
              .filter((d) => parseInt(d, 10) === dayToday)
              .map((day) =>
                scheduleData[day].map((item, idx) => (
                  <li key={`${day}-${idx}`} css={s.reservationItem}>
                    {year}-{formattedMonth}-{day} - {item.time}:00 -{" "}
                    {item.nickName ?? "회원이름"}
                    <button onClick={() => handleCancel(day, idx)}>
                      취소
                    </button>
                  
                  </li>
                ))
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
