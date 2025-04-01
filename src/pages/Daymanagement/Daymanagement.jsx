/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as s from "./style";
import Calendar from "../../components/common/Calendar/Calendar";

function Daymanagement() {
  const [selectedClass, setSelectedClass] = useState("pt");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const [classData, setClassData] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);

  const colorMap = {
    pt: "#87CEEB",
    pilates: "#FFC0CB",
  };

  // ⭐ 매니저 ID 임시 설정 (로그인 연동 시 삭제 예정)
  useEffect(() => {
    setManagerId(1); // or 2
  }, []);

  // 예약 데이터 POST
  useEffect(() => {
    if (Object.keys(scheduleData).length > 0) {
      axios
        .post("/api/makefitness/reservation", scheduleData)
        .then((response) => console.log("예약 내역 전송 성공:", response.data))
        .catch((error) => console.error("예약 내역 전송 실패:", error));
    }
  }, [scheduleData]);

  const handleSelectClass = (type) => {
    setSelectedClass(type);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCancel = (day, time) => {
    setScheduleData((prev) => {
      const daySchedules = prev[day];
      if (!daySchedules || !Array.isArray(daySchedules)) return prev;
      const updatedDaySchedules = daySchedules.filter((item) => item.time !== time);
      return { ...prev, [day]: updatedDaySchedules };
    });

    const identifier = `${day}-${time}`;
    setSelectedReservations((prev) => prev.filter((id) => id !== identifier));

    axios
      .delete(`/api/makefitness/reservation/${identifier}`)
      .then((response) => console.log("예약 취소 성공:", response.data))
      .catch((error) => console.error("예약 취소 실패:", error));
  };

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

  const handleSelectAll = () => {
    const todayIdentifiers = todayReservations.map((reservation) => `${todayString}-${reservation.time}`);
    const allSelected = todayIdentifiers.every((id) => selectedReservations.includes(id));
    if (allSelected) {
      setSelectedReservations((prev) => prev.filter((id) => !todayIdentifiers.includes(id)));
    } else {
      setSelectedReservations((prev) => Array.from(new Set([...prev, ...todayIdentifiers])));
    }
  };

  const todayString = new Date().toISOString().slice(0, 10);
  const todayReservations = scheduleData[todayString] || [];
  const selectedDaySchedule = selectedDate && scheduleData[selectedDate] ? scheduleData[selectedDate] : [];

  return (
    <div css={s.container}>
      <h1 css={s.title}>수업 관리 (매니저 모드)</h1>
      <p css={s.description}>회원 수업 등록 및 취소 관리, 예약 일정을 캘린더에 표시합니다.</p>

      <div css={s.buttonWrapper}>
        {managerId === 1 && (
          <button
            css={s.button}
            style={{ backgroundColor: selectedClass === "pt" ? "#b71c1c" : "#444" }}
            onClick={() => handleSelectClass("pt")}
          >
            PT
          </button>
        )}
        {managerId === 2 && (
          <button
            css={s.button}
            style={{ backgroundColor: selectedClass === "pilates" ? "#b71c1c" : "#444" }}
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
            <>
              <div css={s.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={
                    todayReservations.length > 0 &&
                    todayReservations.every((reservation) =>
                      selectedReservations.includes(`${todayString}-${reservation.time}`)
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
                        onChange={() => handleCheckboxChange(todayString, reservation.time)}
                      />
                      <span css={s.reservationText}>
                        {todayString} {reservation.time} - {reservation.name ?? ""}
                      </span>
                      <button css={s.cancelButton} onClick={() => handleCancel(todayString, reservation.time)}>
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
        <div css={s.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
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
                        onChange={() => handleCheckboxChange(selectedDate, reservation.time)}
                      />
                      <span css={s.reservationText}>
                        {reservation.time} - {reservation.name ?? ""}
                      </span>
                      <button css={s.button2} onClick={() => handleCancel(selectedDate, reservation.time)}>
                        취소
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>예약된 일정이 없습니다.</p>
            )}
            <button css={s.button2} onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Daymanagement;
