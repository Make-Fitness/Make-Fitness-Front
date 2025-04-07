/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";

function ClassReservationModal({
  selectedDateLabel,       // 모달 제목용 날짜 라벨 (예: "2025-04-07")
  reservableClassMap,      // 시간: 수업ID 형태의 예약 가능 여부 정보 (예: { 6: 101, 8: 102, ... })
  selectedTime,            // 현재 선택된 시간 (숫자, 예: 8)
  onSelectTime,            // 시간 선택 핸들러
  onConfirmReserve,        // 예약 확정 버튼 클릭 시 실행 함수
  onClose                  // 모달 닫기
}) {
  return (
    <div css={s.modalWrapper}>
      {/* ✅ 상단 타이틀 */}
      <h4>{selectedDateLabel} 수업 시간 선택</h4>

      {/* ✅ 시간대 버튼 그리드 (06시 ~ 23시) */}
      <div css={s.timeGrid}>
        {Array.from({ length: 18 }, (_, i) => i + 6).map((hour) => {
          const isReservable = reservableClassMap[hour]; // 해당 시간에 수업이 있으면 true

          return (
            <button
              key={hour}
              css={isReservable ? s.reservableButton : s.disabledButton}
              onClick={() => {
                if (isReservable) onSelectTime(hour); // 가능할 때만 선택
              }}
              disabled={!isReservable}
            >
              {String(hour).padStart(2, "0")}:00
            </button>
          );
        })}
      </div>

      {/* ✅ 하단 예약/닫기 버튼 */}
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
