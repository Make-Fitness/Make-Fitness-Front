/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./style";
import { getWorkers } from "../../../apis/masterApi";

const WorkerPage = () => {
  // 현재 날짜 기준으로 초기화
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(
    (now.getMonth() + 1).toString().padStart(2, "0")
  );

  const [workers, setWorkers] = useState([]);

  // API 호출
  const fetchWorkers = async () => {
    try {
      const data = await getWorkers({ year: selectedYear, month: selectedMonth });
      setWorkers(data);
    } catch (error) {
      console.error("근무자 실적 조회 실패:", error);
    }
  };

  // 년월 변경 시 자동 조회
  useEffect(() => {
    fetchWorkers();
  }, [selectedYear, selectedMonth]);

  // 수동 조회 버튼
  const handleSearch = () => {
    fetchWorkers();
  };

  return (
    <div css={s.staffPage}>
      <h2 css={s.description}>근무자 목록</h2>

      {/* 날짜 필터 */}
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
        <button onClick={handleSearch} css={s.button}>
          조회
        </button>
      </div>

      {/* 근무자 표 */}
      <table css={s.staffTable}>
        <thead>
          <tr>
            <th>No</th>
            <th>이름</th>
            <th>성별</th>
            <th>전화번호</th>
            <th>보유회원 수</th>
            <th>수업건수</th>
          </tr>
        </thead>
        <tbody>
          {workers.length > 0 ? (
            workers.map((worker, index) => (
              <tr key={`${worker.managerId}-${index}`}>
                <td>{index + 1}</td>
                <td>{worker.nickname}</td>
                <td>{worker.gender}</td>
                <td>{worker.ph}</td>
                <td>{worker.classMemberCount}</td>
                <td>{worker.classSessionCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>
                조회된 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerPage;
