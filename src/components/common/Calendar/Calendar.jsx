/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import * as s from "./style";

function Calendar({
  scheduleColor,
  isEditable,
  scheduleData,
  setScheduleData,
  setCurrentDate,
  onDateClick,
}) {
  // 현재 날짜를 상태로 관리하여 달 이동이 가능하도록 함
  const [currentDate, setCurrentDateState] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const titleText = `${year}년 ${formattedMonth}월 스케줄`;

  // 달력에 표시할 셀(빈 칸 + 실제 날짜)
  const calendarCells = useMemo(() => {
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    return [...blanks, ...dates];
  }, [firstDay, lastDate]);

  // 해당 날짜에 예약이 있으면 scheduleColor, 없으면 흰색
  const getCellStyle = (dateNumber) => {
    const dateStr = `${year}-${formattedMonth}-${String(dateNumber).padStart(2, "0")}`;
    let style = { position: "relative" };
    if (scheduleData[dateStr] && scheduleData[dateStr].length > 0) {
      style.backgroundColor = scheduleColor;
    } else {
      style.backgroundColor = "#fff";
    }
    return style;
  };

  const handleCellClick = (dateNumber) => {
    if (!dateNumber) return;
    const dateStr = `${year}-${formattedMonth}-${String(dateNumber).padStart(2, "0")}`;
    onDateClick && onDateClick(dateStr);
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    setCurrentDateState(prevMonthDate);
    // 필요 시 이전 달 이동 시에도 스케줄 초기화 처리 가능
    // setScheduleData({});
  };

  // 다음 달로 이동: 달 이동 시 스케줄 데이터 초기화
  const handleNextMonth = () => {
    const nextMonthDate = new Date(year, month + 1, 1);
    setCurrentDateState(nextMonthDate);
    // 달 이동 시 모든 스케줄 데이터 초기화
    setScheduleData({});
  };

  return (
    <div css={s.calendarWrapper}>
      <div css={s.calendarHeader}>
        {/* 이전 달 이동 버튼 */}
        <button onClick={handlePrevMonth} css={s.button}>
          ◀
        </button>
        <h2 css={s.titleBlack}>{titleText}</h2>
        {/* 다음 달 이동 버튼 */}
        <button onClick={handleNextMonth} css={s.button}>
          ▶
        </button>
      </div>

      <div css={s.calendarGrid}>
        {calendarDays.map((day, idx) => {
          const dayColor = idx === 0 ? "red" : idx === 6 ? "blue" : "#333";
          return (
            <div key={idx} css={[s.calendarDayHeader, { color: dayColor }]}>
              {day}
            </div>
          );
        })}

        {/* 날짜 셀 */}
        {calendarCells.map((dateNum, idx) => {
          if (!dateNum) {
            return <div key={idx} css={s.emptyCell}></div>;
          }
          const dayIndex = idx % 7;
          const textColor = dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
          return (
            <div
              key={idx}
              css={[
                s.calendarDateCell,
                getCellStyle(dateNum),
                { color: textColor },
              ]}
              onClick={() => handleCellClick(dateNum)}
            >
              {dateNum}
              {scheduleData[`${year}-${formattedMonth}-${String(dateNum).padStart(2, "0")}`]
                ?.length > 0 && <span css={s.checkMark}>✔</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
