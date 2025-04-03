/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import * as s from "./style";

function Calendar({ scheduleColor, isEditable, scheduleData, setScheduleData, userRole, disablePastDates = false, onDateClick }) {
  const [currentDate, setCurrentDateState] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const titleText = `${year}년 ${formattedMonth}월 스케줄`;

  // 오늘 날짜 (시간 제거된 로컬 Date)
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  }, []);

  const calendarCells = useMemo(() => {
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    return [...blanks, ...dates];
  }, [firstDay, lastDate]);

  const getCellClass = (dateNumber) => {
    const fullDate = new Date(year, month, dateNumber, 0, 0, 0, 0);
    if (disablePastDates && fullDate < today) {
      return s.pastDateCell;
    }
    return null;
  };

  const getCellStyle = (dateNumber) => {
    const dateStr = `${year}-${formattedMonth}-${String(dateNumber).padStart(2, "0")}`;
    let style = { position: "relative" };
    if (scheduleData[dateStr] && scheduleData[dateStr].length > 0) {
      style.backgroundColor = scheduleColor;
    }
    return style;
  };

  const handleCellClick = (dateNumber) => {
    if (!dateNumber) return;
    const fullDate = new Date(year, month, dateNumber, 0, 0, 0, 0); // ← 타임존 안전 방식
    if (disablePastDates && fullDate < today) return;
    onDateClick?.(fullDate);
  };

  const handlePrevMonth = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    setCurrentDateState(prevMonthDate);
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(year, month + 1, 1);
    setCurrentDateState(nextMonthDate);
    setScheduleData({});
  };

  return (
    <div css={s.calendarWrapper}>
      <div css={s.calendarHeader}>
        <button onClick={handlePrevMonth} css={s.button}>◀</button>
        <h2 css={s.titleBlack}>{titleText}</h2>
        <button onClick={handleNextMonth} css={s.button}>▶</button>
      </div>

      <div css={s.calendarGrid}>
        {calendarDays.map((day, idx) => {
          const dayColor = idx === 0 ? "red" : idx === 6 ? "blue" : "#333";
          return (
            <div key={idx} css={[s.calendarDayHeader, { color: dayColor }]}>{day}</div>
          );
        })}

        {calendarCells.map((dateNum, idx) => {
          if (!dateNum) return <div key={idx} css={s.emptyCell}></div>;
          const dayIndex = idx % 7;
          const textColor = dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
          const dateKey = `${year}-${formattedMonth}-${String(dateNum).padStart(2, "0")}`;

          return (
            <div
              key={idx}
              css={[s.calendarDateCell, getCellClass(dateNum), getCellStyle(dateNum), { color: textColor }]}
              onClick={() => handleCellClick(dateNum)}
            >
              {dateNum}
              {scheduleData[dateKey]?.length > 0 && (
                <span css={s.checkMark}>✔</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
