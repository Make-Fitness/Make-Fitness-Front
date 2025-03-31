/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";

const WorkerPage = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("03");

  const handleSearch = () => {
    // 여기에 실제 데이터 조회 로직 구현 예정
    console.log(`조회: ${selectedYear}년 ${selectedMonth}월`);
  };

  const dummyStaffs = [
    { id: 1, name: "김태훈", gender: "남", age: "30세", phone: "010-1234-5678", lessonCount: 25, memberCount: 12 },
    { id: 2, name: "이수민", gender: "여", age: "28세", phone: "010-2345-6789", lessonCount: 30, memberCount: 15 },
    { id: 3, name: "정우성", gender: "남", age: "35세", phone: "010-3456-7890", lessonCount: 20, memberCount: 10 },
  ];

  return (
    <div css={s.staffPage}>
      <h2>근무자 목록</h2>

      <div css={s.filterBox}>
        <label>
          년도:
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2023">2023년</option>
            <option value="2024">2024년</option>
            <option value="2025">2025년</option>
          </select>
        </label>
        <label>
          월:
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              return (
                <option key={month} value={month}>
                  {month}월
                </option>
              );
            })}
          </select>
        </label>
        <button onClick={handleSearch}>조회</button>
      </div>

      <table css={s.staffTable}>
        <thead>
          <tr>
            <th>No</th>
            <th>이름</th>
            <th>성별</th>
            <th>연령</th>
            <th>전화번호</th>
            <th>보유회원 수</th>
            <th>수업건수</th>
          </tr>
        </thead>
        <tbody>
          {dummyStaffs.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.gender}</td>
              <td>{staff.age}</td>
              <td>{staff.phone}</td>
              <td>{staff.memberCount}</td>
              <td>{staff.lessonCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerPage;
