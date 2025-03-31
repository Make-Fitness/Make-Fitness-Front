/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";
import { css } from "@emotion/react";

function Reservations() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [managerId, setManagerId] = useState(null);
  // 백엔드에서 받아온 예약(수업) 데이터 (예시)
  const [classData, setClassData] = useState([]);
  // 오늘 예약 목록에서 체크된 항목 식별자 배열 (형식: "YYYY-MM-DD-시간")
  const [selectedReservations, setSelectedReservations] = useState([]);

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  // 임시 데이터: 오늘 날짜에 해당하는 예약 (실제 API 연동 시 삭제)
  useEffect(() => {
    const dummyData = {
      // 예약 키는 날짜(YYYY-MM-DD) 형식
      "2025-03-31": [
        { time: "10:00", name: "홍길동" },
        { time: "11:00", name: "김철수" },
      ],
    };
    setScheduleData(dummyData);
  }, []);

  // 임시 매니저 ID 설정
  useEffect(() => {
    setManagerId(1);
  }, []);

  // 예약 내역을 백엔드에 전송 (POST 요청)
  useEffect(() => {
    if (Object.keys(scheduleData).length > 0) {
      fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      })
        .then((response) => response.json())
        .then((data) =>
          console.log("예약 내역 전송 성공:", data)
        )
        .catch((error) =>
          console.error("예약 내역 전송 실패:", error)
        );
    }
  }, [scheduleData]);

  // 수업 종류 선택
  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  // 날짜 클릭 시 모달 열기
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 예약 취소 처리: 해당 예약을 삭제 후 백엔드 DELETE 요청 (예시)
  const handleCancel = (day, time) => {
    setScheduleData((prev) => {
      const daySchedules = prev[day];
      if (!daySchedules) return prev;
      const updatedDaySchedules = daySchedules.filter(
        (item) => item.time !== time
      );
      return { ...prev, [day]: updatedDaySchedules };
    });
    const identifier = `${day}-${time}`;
    setSelectedReservations((prev) =>
      prev.filter((id) => id !== identifier)
    );
    fetch(`/api/reservation/${identifier}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => console.log("예약 취소 성공:", data))
      .catch((error) =>
        console.error("예약 취소 실패:", error)
      );
  };

  // 개별 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (day, time) => {
    const identifier = `${day}-${time}`;
    setSelectedReservations((prevSelected) => {
      if (prevSelected.includes(identifier)) {
        return prevSelected.filter((item) => item !== identifier);
      } else {
        return [...prevSelected, identifier];
      }
    });
  };

  // "전체선택" 체크박스 핸들러
  const handleSelectAll = () => {
    const todayIdentifiers = todayReservations.map(
      (reservation) => `${todayString}-${reservation.time}`
    );
    const allSelected = todayIdentifiers.every((id) =>
      selectedReservations.includes(id)
    );
    if (allSelected) {
      setSelectedReservations((prev) =>
        prev.filter((id) => !todayIdentifiers.includes(id))
      );
    } else {
      setSelectedReservations((prev) =>
        Array.from(new Set([...prev, ...todayIdentifiers]))
      );
    }
  };

  // 오늘 날짜 문자열 (YYYY-MM-DD)
  const todayString = new Date().toISOString().slice(0, 10);
  // 오늘 예약 목록: scheduleData에서 todayString 키에 해당하는 배열
  const todayReservations = scheduleData[todayString] || [];

  // 선택한 날짜의 예약 목록 (모달용)
  const selectedDaySchedule =
    selectedDate && scheduleData[selectedDate]
      ? scheduleData[selectedDate]
      : [];

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 관리 (매니저 모드)</h1>
      <p css={s.description}>
        회원 수업 등록 및 취소 관리, 예약 일정을 캘린더에 표시합니다.
      </p>

      <div css={s.buttonWrapper}>
        {managerId === 1 && (
          <button
            css={s.button}
            style={{
              backgroundColor:
                selectedClass === "pt" ? "#b71c1c" : "#444",
            }}
            onClick={() => handleSelectClass("pt")}
          >
            PT
          </button>
        )}
        {managerId === 2 && (
          <button
            css={s.button}
            style={{
              backgroundColor:
                selectedClass === "pilates" ? "#b71c1c" : "#444",
            }}
            onClick={() => handleSelectClass("pilates")}
          >
            필라테스
          </button>
        )}
      </div>

      <div css={s.contentWrapper}>
        {/* 왼쪽 캘린더 영역 */}
        <div css={s.box}>
          <Calendar
            scheduleColor={colorMap[selectedClass]}
            isEditable={true}
            scheduleData={scheduleData}
            setScheduleData={setScheduleData}
            setCurrentDate={setCurrentDate}
            onDateClick={handleDateClick}
          />
        </div>

        {/* 오른쪽 오늘 예약 내역 영역 */}
        <div css={s.reservationListWrapper}>
          <h5>오늘 내 스케줄</h5>
          {todayReservations.length === 0 ? (
            <p>오늘 예약이 없습니다.</p>
          ) : (
            <>
             
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  margin-bottom: 0.5rem;
                `}
              >
                <input
                  type="checkbox"
                  checked={
                    todayReservations.length > 0 &&
                    todayReservations.every((reservation) =>
                      selectedReservations.includes(
                        `${todayString}-${reservation.time}`
                      )
                    )
                  }
                  onChange={handleSelectAll}
                />
                <span style={{ marginLeft: "0.5rem" }}>전체선택</span>
              </div>
              <ul css={s.reservationList}>
                {todayReservations.map((reservation, index) => {
                  const identifier = `${todayString}-${reservation.time}`;
                  return (
                    <li key={index} css={s.reservationItem}>
                      <input
                        type="checkbox"
                        checked={selectedReservations.includes(identifier)}
                        onChange={() =>
                          handleCheckboxChange(
                            todayString,
                            reservation.time
                          )
                        }
                      />
                      <span css = {css` font-size: 1.5rem; margin-right: 14rem;`}>
                        {todayString} {reservation.time} -{" "}
                        {reservation.name ?? ""}
                      </span>
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
                        onClick={() =>
                          handleCancel(todayString, reservation.time)
                        }
                      >
                        취소
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>

    
      {isModalOpen && (
        <div
          css={s.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            css={s.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedDate} 일정</h2>
            {selectedDaySchedule.length > 0 ? (
              <ul>
                {selectedDaySchedule.map((reservation, index) => {
                  const identifier = `${selectedDate}-${reservation.time}`;
                  return (
                    <li key={index}>
                      <input
                        type="checkbox"
                        checked={selectedReservations.includes(identifier)}
                        onChange={() =>
                          handleCheckboxChange(
                            selectedDate,
                            reservation.time
                          )
                        }
                      />
                      <span css={css` font-size: 1.5rem; color: black; margin-bottom: 1rem;`}>
                      {reservation.time} - {reservation.name ?? ""}
                      </span>
                    
                      <button css = {s. button2}
                        onClick={() =>
                          handleCancel(selectedDate, reservation.time)
                        }
                      >
                        취소
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>예약된 일정이 없습니다.</p>
            )}
            <button css = {s. button2} onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservations;
