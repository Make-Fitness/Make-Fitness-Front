/** @jsxImportSource @emotion/react */
// Emotion의 css prop을 사용하기 위한 선언

import React, { useEffect, useState } from "react";
import * as s from "./style"; // 스타일 모듈
import axios from "axios";

function TimeModalForRegistration({
  selectedDateStr,             // 선택된 날짜 문자열 (yyyy-MM-dd)
  onConfirmReserve,           // 등록 확인 핸들러
  onClose,                    // 모달 닫기 핸들러
  isForRegistration = false, // 등록 모드 여부
  alreadyRegisteredTimes = [], // 이미 등록된 시간 리스트
  isDeleteMode = false,       // 삭제 모드 여부
  toggleDeleteMode = () => {}, // 삭제 모드 토글 함수
  onDeleteClasses = () => {}, // 삭제 실행 함수
  isPast = false              // 과거 날짜 여부
}) {
  const [selectedTimes, setSelectedTimes] = useState([]); // 선택된 시간들

  // 시간 선택/취소 토글 함수
  const toggleTime = (hour) => {
    setSelectedTimes((prev) =>
      prev.includes(hour)
        ? prev.filter((t) => t !== hour)
        : [...prev, hour]
    );
  };

  // 삭제/등록 모드 전환 시 선택 초기화
  useEffect(() => {
    setSelectedTimes([]);
  }, [isDeleteMode]);

  const allHours = Array.from({ length: 18 }, (_, i) => i + 6); // 6 ~ 23시

  // 삭제 처리 요청 (REST API 호출)
  const handleDeleteClass = async (times) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const [yyyy, MM, dd] = selectedDateStr.split("-");

    try {
      const res = await axios.get("/api/makefitness/classes/with-reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      for (const hour of times) {
        const HH = String(hour).padStart(2, "0");
        const matched = res.data.find(
          (c) =>
            c.classTime.startsWith(`${yyyy}-${MM}-${dd}`) &&
            c.classTime.includes(`${HH}:00:00`)
        );
        if (matched) {
          await axios.delete(`/api/makefitness/classes/${matched.classId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      }

      alert("선택한 수업이 삭제되었습니다.");
      window.location.reload(); // 삭제 후 새로고침 (향후 상태 기반 갱신으로 개선 가능)
    } catch (err) {
      console.error("수업 삭제 실패", err);
      alert("수업 삭제 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div css={s.modalWrapper}>
      {/* 제목 영역 */}
      <h4 css={isDeleteMode ? s.deleteTitle : undefined}>
        {selectedDateStr} 수업 시간 {isDeleteMode ? "삭제" : "선택"}
      </h4>

      {/* 시간 선택 버튼들 */}
      <div css={s.timeGrid}>
        {allHours.map((hour) => {
          const isSelected = selectedTimes.includes(hour);
          const isAlreadyRegistered = alreadyRegisteredTimes.includes(hour);

          // 삭제 모드 & 이미 등록된 시간만 버튼 활성화
          if (isDeleteMode && isAlreadyRegistered) {
            return (
              <button
                key={hour}
                css={isSelected ? s.deleteSelectedButton : s.deleteButton}
                onClick={() => !isPast && toggleTime(hour)}
                disabled={isPast}
              >
                {String(hour).padStart(2, "0")}:00
              </button>
            );
          }

          // 등록 모드
          if (!isDeleteMode) {
            return (
              <button
                key={hour}
                css={
                  isAlreadyRegistered
                    ? s.alreadyRegisteredButton
                    : isSelected
                    ? s.selectedButton
                    : s.disabledButton
                }
                onClick={() => {
                  if (!isAlreadyRegistered && isForRegistration && !isPast) {
                    toggleTime(hour);
                  }
                }}
                disabled={isAlreadyRegistered || isPast}
              >
                {String(hour).padStart(2, "0")}:00
              </button>
            );
          }

          // 삭제 모드인데 등록되지 않은 시간: 무조건 비활성화
          return (
            <button key={hour} css={s.alreadyRegisteredButton} disabled>
              {String(hour).padStart(2, "0")}:00
            </button>
          );
        })}
      </div>

      {/* 하단 컨트롤 버튼들 */}
      <div css={s.buttonWrapper}>
        {/* 등록 모드 버튼 */}
        {!isDeleteMode && (
          <>
            <button
              css={s.confirmButton}
              onClick={toggleDeleteMode}
              style={{ marginRight: "auto" }}
              disabled={isPast}
            >
              수업 삭제 모드
            </button>

            <button
              css={s.confirmButton}
              disabled={isPast}
              onClick={() => {
                const available = allHours.filter(
                  (h) => !alreadyRegisteredTimes.includes(h)
                );
                setSelectedTimes(available);
              }}
            >
              전체 선택
            </button>

            {selectedTimes.length > 0 && (
              <button
                css={s.confirmButton}
                onClick={() => onConfirmReserve(selectedTimes)}
                disabled={isPast}
              >
                수업 등록
              </button>
            )}
          </>
        )}

        {/* 삭제 모드 버튼 */}
        {isDeleteMode && (
          <>
            <button
              css={s.confirmButton}
              style={{ marginRight: "auto" }}
              onClick={toggleDeleteMode}
            >
              삭제 취소
            </button>

            <button
              css={s.confirmButton}
              disabled={isPast || selectedTimes.length === 0}
              onClick={() => handleDeleteClass(selectedTimes)}
            >
              삭제하기
            </button>
          </>
        )}

        {/* 닫기 버튼 */}
        <button css={s.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default TimeModalForRegistration;
