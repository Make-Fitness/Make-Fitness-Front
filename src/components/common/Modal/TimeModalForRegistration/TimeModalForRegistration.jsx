/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import axios from "axios";

function TimeModalForRegistration({
  selectedDateStr,             // 선택한 날짜 (예: "2025-04-07")
  onConfirmReserve,            // 등록 시 실행할 핸들러 (selectedTimes 전달됨)
  onClose,                     // 모달 닫기 핸들러
  isForRegistration = false,  // 등록 모드 여부
  alreadyRegisteredTimes = [],// 이미 등록된 시간 배열 (숫자 배열)
  isDeleteMode = false,       // 현재 삭제 모드 여부
  toggleDeleteMode = () => {},// 삭제 모드 전환 함수
  isPast = false              // 과거 날짜 여부 (버튼 비활성화 조건)
}) {
  const [selectedTimes, setSelectedTimes] = useState([]); // 현재 선택된 시간들

  // 시간 클릭 시 토글
  const toggleTime = (hour) => {
    setSelectedTimes((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };

  // 모드 전환 시마다 선택 초기화
  useEffect(() => {
    setSelectedTimes([]);
  }, [isDeleteMode]);

  const allHours = Array.from({ length: 18 }, (_, i) => i + 6); // 06:00 ~ 23:00 시간대

  /**
   * 삭제 API 호출 처리
   */
  const handleDeleteClass = async (times) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const [yyyy, MM, dd] = selectedDateStr.split("-");

    try {
      // 날짜 기반으로 해당 날짜 수업 리스트 조회
      const res = await axios.get("/api/makefitness/classes/with-reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 선택된 시간들에 대해 일치하는 classId 찾아서 삭제
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
      window.location.reload(); // 향후 상태 기반 갱신으로 개선 가능
    } catch (err) {
      console.error("수업 삭제 실패", err);
      alert("수업 삭제 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div css={s.modalWrapper}>
      {/* 모달 상단 제목 */}
      <h4 css={isDeleteMode ? s.deleteTitle : undefined}>
        {selectedDateStr} 수업 시간 {isDeleteMode ? "삭제" : "선택"}
      </h4>

      {/* 시간 버튼 그리드 */}
      <div css={s.timeGrid}>
        {allHours.map((hour) => {
          const isSelected = selectedTimes.includes(hour);
          const isAlreadyRegistered = alreadyRegisteredTimes.includes(hour);

          // 삭제 모드: 등록된 시간만 활성화
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

          // 등록 모드: 미등록된 시간만 선택 가능
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

          // 삭제 모드인데 등록 안 된 시간: 비활성화
          return (
            <button key={hour} css={s.alreadyRegisteredButton} disabled>
              {String(hour).padStart(2, "0")}:00
            </button>
          );
        })}
      </div>

      {/* 하단 버튼 영역 */}
      <div css={s.buttonWrapper}>
        {/* 등록 모드 컨트롤 */}
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

        {/* 삭제 모드 컨트롤 */}
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

        {/* 닫기 */}
        <button css={s.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default TimeModalForRegistration;
