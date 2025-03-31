/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function ClassRegistration() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const [selectedReservations, setSelectedReservations] = useState([]);

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  // 임시 데이터 설정 (테스트 시 실제 API 호출 대신 사용)
  useEffect(() => {
    const dummyData = {
      // 오늘 날짜에 해당하는 데이터 (UTC 기준이므로 실제 오늘과 차이가 있을 수 있음)
      "2025-03-31": [
        { class_time: "10:00", nickname: "홍길동" },
        { class_time: "11:00", nickname: "김철수" },
      ],
    };
    setScheduleData(dummyData);
  }, []);

  // 임시 매니저 ID 설정
  useEffect(() => {
    setManagerId(1);
  }, []);

  // scheduleData가 바뀔 때마다 백엔드에 POST (실제 연동 시 사용)
  useEffect(() => {
    if (Object.keys(scheduleData).length > 0) {
      fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleData),
      })
        .then((response) => response.json())
        .then((data) => console.log("예약 내역 전송 성공:", data))
        .catch((error) => console.error("예약 내역 전송 실패:", error));
    }
  }, [scheduleData]);

  // 수업 종류 선택
  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  // 모달 열기 (날짜 클릭 시)
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 예약 취소 처리
  const handleCancel = (day, time) => {
    setScheduleData((prev) => {
      const daySchedules = prev[day];
      if (!daySchedules) return prev;
      const updatedDaySchedules = daySchedules.filter(
        (item) => item.time !== time
      );
      return { ...prev, [day]: updatedDaySchedules };
    });
    // 취소 시 체크된 예약도 상태에서 제거
    const identifier = `${day}-${time}`;
    setSelectedReservations((prev) =>
      prev.filter((id) => id !== identifier)
    );
  };

  // 체크박스 선택 상태 변경 핸들러
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

  // 오늘 날짜 기준 스케줄 필터링 (UTC 기준 주의)
  const todayString = new Date().toISOString().slice(0, 10);
  const todayReservations = Object.entries(scheduleData)
    .filter(([day]) => day === todayString)
    .flatMap(([_, reservations]) => reservations);

  // 선택한 날짜의 예약 목록
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
              backgroundColor: selectedClass === "pt" ? "#b71c1c" : "#444",
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

        <div css={s.reservationListWrapper}>
          <h5>오늘 내 스케줄</h5>
          {todayReservations.length === 0 ? (
            <p>오늘 예약이 없습니다.</p>
          ) : (
            <ul css={s.reservationList}>
              {todayReservations.map((reservation, index) => {
                const identifier = `${todayString}-${reservation.time}`;
                return (
                  <li key={index} css={s.reservationItem}>
                    <input
                      type="checkbox"
                      checked={selectedReservations.includes(identifier)}
                      onChange={() =>
                        handleCheckboxChange(todayString, reservation.time)
                      }
                    />
                    <span>
                      {todayString} {reservation.time} -{" "}
                      {reservation.name ?? ""}
                    </span>
                    <button
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
          )}
        </div>
      </div>

      {/* 날짜별 예약 모달 */}
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
                          handleCheckboxChange(selectedDate, reservation.time)
                        }
                      />
                      <span>
                        {reservation.time} -{" "}
                        {reservation.name ?? ""}
                      </span>
                      <button
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
            <button onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassRegistration;
