/** @jsxImportSource @emotion/react */
// Emotion의 css prop 사용 가능하게 설정

import React, { useMemo, useState } from "react";
import { css } from "@emotion/react";
import * as s from "./style";

function Calendar({
  scheduleColor,         // 수업이 있는 날짜에 칠할 배경색
  isEditable,            // 편집 가능 여부 (지금은 사용 X)
  scheduleData,          // 날짜별 수업 정보 객체 { yyyy-mm-dd: [{ time, subject }] }
  setScheduleData,       // 외부에서 일정 상태 관리할 때 사용 (지금은 비활성화)
  userRole,              // 사용자 권한 (지금은 사용 X)
  disablePastDates = false, // 과거 날짜 클릭 불가 설정 여부
  onDateClick,           // 날짜 클릭 시 실행할 함수
}) {
  const [currentDate, setCurrentDateState] = useState(new Date());

  // 현재 연도/월 관련 정보 계산
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");

  // 1일이 무슨 요일인지, 총 며칠 있는지 계산
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const titleText = `${year}년 ${formattedMonth}월 스케줄`;

  // 오늘 날짜 (시간 제거해서 비교용)
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  }, []);

  // 달력에 표시할 셀 목록 계산 (공백 + 날짜)
  const calendarCells = useMemo(() => {
    const blanks = Array(firstDay).fill(null); // 앞쪽 공백 채우기
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1); // 1~말일까지 숫자
    return [...blanks, ...dates];
  }, [firstDay, lastDate]);

  // 셀 클래스: 과거 날짜면 회색 처리
  const getCellClass = (dateNumber) => {
    const fullDate = new Date(year, month, dateNumber, 0, 0, 0, 0);
    if (disablePastDates && fullDate < today) {
      return s.pastDateCell; // 스타일에서 회색으로 처리됨
    }
    return null;
  };

  // 셀 배경 스타일: 수업이 있는 날짜는 색칠함
  const getCellStyle = (dateNumber) => {
    const dateStr = `${year}-${formattedMonth}-${String(dateNumber).padStart(2, "0")}`;
    let style = { position: "relative" };
    if (scheduleData[dateStr] && scheduleData[dateStr].length > 0) {
      style.backgroundColor = scheduleColor; // 수업 있음 표시 색상
    }
    return style;
  };

  // 날짜 셀 클릭 처리
  const handleCellClick = (dateNumber) => {
    if (!dateNumber) return;
    const fullDate = new Date(year, month, dateNumber, 0, 0, 0, 0);

    // disablePastDates가 true이고 과거 날짜이면 클릭 막음
    if (disablePastDates && fullDate < today) return;

    // 날짜 클릭 시 부모로 전달
    onDateClick?.(fullDate);
  };

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    setCurrentDateState(prevMonthDate);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const nextMonthDate = new Date(year, month + 1, 1);
    setCurrentDateState(nextMonthDate);
    setScheduleData({}); // 다음 달로 이동 시 스케줄 초기화
  };

  return (
    <div css={s.calendarWrapper}>
      {/* 헤더: 이전/다음 버튼, 제목 */}
      <div css={s.calendarHeader}>
        <button onClick={handlePrevMonth} css={s.button}>◀</button>
        <h2 css={s.titleBlack}>{titleText}</h2>
        <button onClick={handleNextMonth} css={s.button}>▶</button>
      </div>

      {/* 요일 헤더 */}
      <div css={s.calendarGrid}>
        {calendarDays.map((day, idx) => {
          const dayColor = idx === 0 ? "red" : idx === 6 ? "blue" : "#333";
          return (
            <div key={idx} css={[s.calendarDayHeader, { color: dayColor }]}> {day} </div>
          );
        })}

        {/* 날짜 셀들 */}
        {calendarCells.map((dateNum, idx) => {
          if (!dateNum) return <div key={idx} css={s.emptyCell}></div>; // 공백 처리

          const dayIndex = idx % 7; // 일~토 순서
          const textColor = dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black";
          const dateKey = `${year}-${formattedMonth}-${String(dateNum).padStart(2, "0")}`;

          return (
            <div
              key={idx}
              css={[
                s.calendarDateCell,
                getCellClass(dateNum), // 회색 처리 여부
                getCellStyle(dateNum), // 배경색 표시
                { color: textColor },  // 텍스트 색상 (일/토/평일)
              ]}
              onClick={() => handleCellClick(dateNum)}
            >
              {dateNum}
              {scheduleData[dateKey]?.length > 0 && (
                <span css={s.checkMark}>✔</span> // 수업 있으면 체크 표시
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;