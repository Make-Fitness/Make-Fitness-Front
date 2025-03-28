/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import * as s from "./style";


const profileMapping = {
  "12034491200": "/profiles/park.jpeg",
  "12930491200": "/profiles/jang.jpg",
  "12949294900": "/profiles/kang.jpg",
  "12909090000": "/profiles/shin.jpg",
  "20020000000": "/profiles/kim.jpg"
};

const getCellStyle = (record) => {
  if (record?.checked) {
    return { backgroundColor: "lightgreen", position: "relative" };
  }
  return { backgroundColor: "#fff", position: "relative" };
};

function CalendarManager() {
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [scheduleData, setScheduleData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const isValidPhone = phoneNumber && phoneNumber.length >= 10;

  const fetchScheduleData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/ph?ph=${phoneNumber}`);
      if (!response.ok) throw new Error("강사 정보를 불러올 수 없습니다.");
      const data = await response.json();

     
      if (data.ph && data.nickname) {
        setTeacherList([data]);
      } else if (data.teachers) {
        setTeacherList(data.teachers);
      } else {
        setTeacherList([]);
      }
      setScheduleData(data.schedule || {});
    } catch (err) {
      setError(err.message || "데이터 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarCells = useMemo(() => {
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: lastDate }, (_, i) => i + 1);
    return [...blanks, ...dates];
  }, [year, month, firstDay, lastDate]);

  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const titleText = `${year}년 ${formattedMonth}월 출근 현황`;

 
  const handleDateClick = (date) => {
    const dateString = `${year}-${formattedMonth}-${String(date).padStart(2, "0")}`;
    setScheduleData((prev) => ({
      ...prev,
      [dateString]: { checked: !prev[dateString]?.checked }
    }));
  };

  return (
    <div css={s.calendarAndListWrapper}>
       <div css={s.leftWrapper}>
        <div css={s.box}>
          <input
            css={s.number}
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호 입력 (예: 01012345678)"
          />
          <button css={s.button} onClick={fetchScheduleData} disabled={!isValidPhone}>
            조회
          </button>
          {!isValidPhone && phoneNumber && (
            <p css={s.errorMessage}>전화번호는 10자리 이상이어야 합니다.</p>
          )}
        </div>

        {loading && <div css={s.spinnerStyle} />}
        {error && <p css={s.errorMessage}>{error}</p>}

        <div css={s.calendarWrapper}>
          <div css={s.calendarHeader}>
            <button css={s.button} onClick={prevMonth}>
              &lt;
            </button>
            <h2 css={{ fontSize: "2.5rem", fontWeight: "bold" }}>{titleText}</h2>
            <button css={s.button} onClick={nextMonth}>
              &gt;
            </button>
          </div>

          <div css={s.calendarGrid}>
            {calendarDays.map((day, i) => (
              <div
                key={day}
                css={[
                  s.calendarDayHeader,
                  { color: i === 0 ? "red" : i === 6 ? "blue" : "#333" }
                ]}
              >
                {day}
              </div>
            ))}

            {calendarCells.map((date, idx) => {
              if (!date) return <div key={idx} css={s.emptyCell}></div>;

              const dayIndex = idx % 7;
              const dateString = `${year}-${formattedMonth}-${String(date).padStart(2, "0")}`;
              const record = scheduleData[dateString];
              const cellStyle = getCellStyle(record);

              return (
                <div
                  key={idx}
                  css={[
                    s.calendarDateCell,
                    {
                      color: dayIndex === 0 ? "red" : dayIndex === 6 ? "blue" : "black"
                    },
                    cellStyle
                  ]}
                  onClick={() => handleDateClick(date)}
                >
                  {date}
                  {record?.checked && (
                    <span
                      css={{
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        fontSize: "1rem",
                        color: "green"
                      }}
                    >
                      ✔
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
      <div css={s.rightWrapper}>
        <div css={s.teacherInfoWrapper}>
          <h3>강사 정보</h3>
          {teacherList && teacherList.length > 0 ? (
            teacherList.map((teacher) => {
              
              const profileUrl =
                profileMapping[teacher.ph] ||
                "";
              return (
                <div key={teacher.ph} css={{ marginBottom: "1rem" }}>
                  <p>{teacher.nickname}</p>
                  <img src={profileUrl} alt="강사 프로필" css={s.teacherImage} />
                </div>
              );
            })
          ) : (
            <p>강사 정보를 조회하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarManager;
