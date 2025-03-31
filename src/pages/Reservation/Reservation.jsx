/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { css } from "@emotion/react";

function Reservation() {
  const [selectedClass, setSelectedClass] = useState("pt");
  // 캘린더 관련 데이터 (필요 시 유지)
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [instructorId, setInstructorId] = useState();
  // class_tb(또는 예약) 데이터 (백엔드에서 받아옴)
  const [classData, setClassData] = useState([]);

  // 오늘 날짜 관련 변수
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const dayToday = currentDate.getDate();
  const formattedMonth = month.toString().padStart(2, "0");

  
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

  // 백엔드로 신규 예약 데이터를 전송하는 함수 (POST)
  const sendReservationToBackend = (newReservation) => {
    fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/jwt" },
      body: JWT.stringify(newReservation),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("예약 내역 전송 성공", data);
      })
      .catch((error) => console.error("예약 내역 전송 실패", error));
  };

  // 강사 정보 가져오기 (예시)
  useEffect(() => {
    fetch("/api/reservation")
      .then((res) => res.jwt())
      .then((data) => {
         setInstructorId(data.id);
      })
      .catch((error) => console.error("강사 ID 불러오기 실패", error));
  }, []);

  // 예약(수업) 데이터(class_tb) 가져오기
  useEffect(() => {
    fetch("/api/reservation")
      .then((res) => res.jwt())
      .then((data) => {
        
        setClassData(data);
      })
      .catch((error) => console.error("class_tb 불러오기 실패", error));
  }, []);

  // 수업 타입 선택 핸들러
  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  // 예약(수업) 취소: classData에서 해당 id를 가진 항목 제거 후 백엔드에도 DELETE 요청 전송
  const handleCancel = (id) => {
    setClassData((prev) => prev.filter((item) => item.id !== id));
    fetch(`/api/reservation/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log("예약 취소 성공", data))
      .catch((error) => console.error("예약 취소 실패", error));
  };

  // 오늘 날짜와 일치하는 예약만 필터링 (예약 추가 시 백엔드의 created_tb 필드 사용)
  const todayReservations = classData.filter((item) => {
    const createdDate = new Date(item.created_tb);
    return (
      createdDate.getFullYear() === currentDate.getFullYear() &&
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getDate() === currentDate.getDate()
    );
  });

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
          <h3>오늘 스케줄</h3>
          {todayReservations.length === 0 ? (
            <p>오늘은 예약이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {todayReservations.map((item) => {
                const createdDate = new Date(item.created_tb);
                const reservationHour = createdDate.getHours();
                const reservationDate = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${createdDate.getDate().toString().padStart(2, "0")}`;
                return (
                  <li key={item.id} css={s.reservationItem}>
                    {reservationDate} - {reservationHour}:00 -{" "}
                    {item.nickName ?? "회원이름"}
                    <button
                      css={css`
                        background-color: black !important;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        margin-left: 1rem;
                        border-radius: 4px;
                      `}
                      onClick={() => handleCancel(item.id)}
                    >
                      취소
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
