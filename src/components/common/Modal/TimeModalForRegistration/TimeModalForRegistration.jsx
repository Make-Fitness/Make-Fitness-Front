/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";

function TimeModalForRegistration({
  selectedDateStr,
  onConfirmReserve,
  onClose,
  isForRegistration = false,
  alreadyRegisteredTimes = [],
  isDeleteMode = false,
  toggleDeleteMode = () => {},
  onDeleteClasses = () => {},
}) {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const toggleTime = (hour) => {
    setSelectedTimes((prev) =>
      prev.includes(hour) ? prev.filter((t) => t !== hour) : [...prev, hour]
    );
  };

  useEffect(() => {
    setSelectedTimes([]); // 모드 전환 시 초기화
  }, [isDeleteMode]);

  const allHours = Array.from({ length: 18 }, (_, i) => i + 6); // 6 ~ 23시

  return (
    <div css={s.modalWrapper}>
      <h4 css={isDeleteMode ? s.deleteTitle : undefined}>
        {selectedDateStr} 수업 시간 {isDeleteMode ? "삭제" : "선택"}
      </h4>

      <div css={s.timeGrid}>
        {allHours.map((hour) => {
          const isSelected = selectedTimes.includes(hour);
          const isAlreadyRegistered = alreadyRegisteredTimes.includes(hour);

          if (isDeleteMode && isAlreadyRegistered) {
            return (
              <button
                key={hour}
                css={isSelected ? s.deleteSelectedButton : s.deleteButton}
                onClick={() => toggleTime(hour)}
              >
                {String(hour).padStart(2, "0")}:00
              </button>
            );
          }

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
                  if (!isAlreadyRegistered && isForRegistration)
                    toggleTime(hour);
                }}
                disabled={isAlreadyRegistered}
              >
                {String(hour).padStart(2, "0")}:00
              </button>
            );
          }

          return (
            <button key={hour} css={s.alreadyRegisteredButton} disabled>
              {String(hour).padStart(2, "0")}:00
            </button>
          );
        })}
      </div>

      <div css={s.buttonWrapper}>
        {!isDeleteMode && (
          <>
            <button
              css={s.confirmButton}
              onClick={toggleDeleteMode}
              style={{ marginRight: "auto" }}
            >
              수업 삭제 모드
            </button>

            <button
              css={s.confirmButton}
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
              >
                수업 등록
              </button>
            )}
          </>
        )}

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
              disabled={selectedTimes.length === 0}
              onClick={() => onDeleteClasses(selectedTimes)}
            >
              삭제하기
            </button>
          </>
        )}

        <button css={s.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default TimeModalForRegistration;
