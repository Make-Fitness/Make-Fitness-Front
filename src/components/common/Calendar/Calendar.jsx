/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import * as s from "./style";

function Calendar({
  scheduleColor,
  isEditable,
  scheduleData,
  setScheduleData,
  setCurrentDate,
  onDateClick,
}) {
  const currentDate = new Date();
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

  return (
    <div css={s.calendarWrapper}>
      <div css={s.calendarHeader}>
        <h2 css={s.titleBlack}>{titleText}</h2>
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
