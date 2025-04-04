/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";

function TimeModal({
  selectedDateStr,
  availableClassMap,
  selectedTime,
  onSelectTime,
  onConfirmReserve,
  onClose
}) {
  return (
    <div css={s.modalWrapper}>
      {/* ✅ 그냥 문자열 그대로 출력해야 하루 안 밀림 */}
      <h4>{selectedDateStr} 수업 시간 선택</h4>
      <div css={s.timeGrid}>
        {Array.from({ length: 19 }, (_, i) => i + 6).map((hour) => (
          <button
            key={hour}
            css={availableClassMap[hour] ? s.reservableButton : s.disabledButton}
            onClick={() => {
              if (availableClassMap[hour]) {
                onSelectTime(hour);
              }
            }}
          >
            {String(hour).padStart(2, "0")}:00
          </button>
        ))}
      </div>
      <div css={s.buttonWrapper}>
        {selectedTime !== null && (
          <button css={s.confirmButton} onClick={onConfirmReserve}>
            예약 선택
          </button>
        )}
        <button css={s.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default TimeModal;
