/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import * as s from "./style";

function Calendar({
  scheduleColor,       // 예약 색상 (예: 빨간 배경 등)
  isEditable,          // 수정 가능 여부 (현재 미사용)
  scheduleData,        // 날짜별 예약 데이터 { '2025-04-07': [수업1, 수업2] }
  setScheduleData,     // 예약 데이터 갱신 함수 (현재 미사용)
  userRole,            // 사용자 역할 (현재 미사용)
  disablePastDates = false, // 과거 날짜 클릭 막기 여부
  onDateClick,         // 날짜 클릭 시 실행할 함수
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = String(month + 1).padStart(2, "0");

  const firstDay = new Date(year, month, 1).getDay(); // 해당 달의 시작 요일 (일:0 ~ 토:6)
  const lastDate = new Date(year, month + 1, 0).getDate(); // 말일

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  }, []);

  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const titleText = `${year}년 ${formattedMonth}월 스케줄`;

  // 날짜 셀 배열 생성 (앞 공백 + 날짜)
  const calendarCells = useMemo(() => {
    const blanks = Array(firstDay).fill(null); // 예: 시작 요일이 수요일이면 [null, null, null]
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1); // [1, 2, ..., 30]
    return [...blanks, ...dates];
  }, [firstDay, lastDate]);

  // ❗ 과거 날짜이면 스타일 지정
  const getCellClass = (dateNum) => {
    const targetDate = new Date(year, month, dateNum);
    if (disablePastDates && targetDate < today) {
      return s.pastDateCell; // 빨간 배경 등 비활성화 스타일
    }
    return null;
  };

  // ✅ 수업이 있는 날짜는 배경색 처리
  const getCellStyle = (dateNum) => {
    const dateStr = `${year}-${formattedMonth}-${String(dateNum).padStart(2, "0")}`;
    const hasSchedule = scheduleData[dateStr]?.length > 0;
    return hasSchedule ? { backgroundColor: scheduleColor, position: "relative" } : { position: "relative" };
  };

  // 날짜 셀 클릭 시 실행
  const handleCellClick = (dateNum) => {
    if (!dateNum) return;

    const targetDate = new Date(year, month, dateNum);
    if (disablePastDates && targetDate < today) return;

    onDateClick?.(targetDate); // 부모로 이벤트 전달
  };

  // 이전/다음 달 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div css={s.calendarWrapper}>
      {/* ✅ 상단 월 헤더 */}
      <div css={s.calendarHeader}>
        <button css={s.button} onClick={handlePrevMonth}>◀</button>
        <h2 css={s.titleBlack}>{titleText}</h2>
        <button css={s.button} onClick={handleNextMonth}>▶</button>
      </div>

      {/* ✅ 요일 (일~토) */}
      <div css={s.calendarGrid}>
        {calendarDays.map((day, idx) => {
          const color = idx === 0 ? "red" : idx === 6 ? "blue" : "#333";
          return (
            <div key={idx} css={[s.calendarDayHeader, { color }]}>
              {day}
            </div>
          );
        })}

        {/* ✅ 날짜 셀 렌더링 */}
        {calendarCells.map((dateNum, idx) => {
          if (!dateNum) return <div key={idx} css={s.emptyCell}></div>;

          const dayIndex = idx % 7;
          const textColor = dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
          const dateKey = `${year}-${formattedMonth}-${String(dateNum).padStart(2, "0")}`;

          return (
            <div
              key={idx}
              css={[
                s.calendarDateCell,
                getCellClass(dateNum),
                getCellStyle(dateNum),
                { color: textColor }
              ]}
              onClick={() => handleCellClick(dateNum)}
            >
              {dateNum}

              {/* ✅ 출석한 날짜 표시용 체크 마크 */}
              {scheduleData[dateKey] && <span css={s.checkMarkBig}>✔</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
