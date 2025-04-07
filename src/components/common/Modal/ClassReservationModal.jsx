/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";

function ClassReservationModal({
  selectedDateLabel,
  reservableClassMap,
  selectedTime,
  onSelectTime,
  onConfirmReserve,
  onClose
}) {
  return (
    <div css={s.modalWrapper}>
      <h4>{selectedDateLabel} 수업 시간 선택</h4>

      <div css={s.timeGrid}>
        {Array.from({ length: 18 }, (_, i) => i + 6).map((hour) => {
          const isReservable = reservableClassMap[hour];
          return (
            <button
              key={hour}
              css={isReservable ? s.reservableButton : s.disabledButton}
              onClick={() => {
                if (isReservable) onSelectTime(hour);
              }}
              disabled={!isReservable}
            >
              {String(hour).padStart(2, "0")}:00
            </button>
          );
        })}
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

export default ClassReservationModal;
