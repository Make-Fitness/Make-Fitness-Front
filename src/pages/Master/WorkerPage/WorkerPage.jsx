/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./style";
import axios from "axios";

const WorkerPage = () => {
  // ✅ 필터 상태 (년도/월)
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("03");

  // ✅ 백엔드에서 받아온 근무자 리스트
  const [workers, setWorkers] = useState([]);

  // ✅ 백엔드 근무자 실적 조회 요청 함수
  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const classTime = `${selectedYear}-${selectedMonth}-01`;

      const response = await axios.get("/api/makefitness/admin/manager", {
        params: { classTime },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWorkers(response.data);
    } catch (error) {
      console.error("근무자 실적 조회 실패:", error);
    }
  };

  // ✅ 년/월 변경 시 자동 조회
  useEffect(() => {
    fetchWorkers();
  }, [selectedYear, selectedMonth]);

  // ✅ 수동 조회 버튼 핸들러
  const handleSearch = () => {
    fetchWorkers();
  };

  // ✅ 렌더링
  return (
    <div css={s.staffPage}>
      <h2 css={s.description}>근무자 목록</h2>

      {/* ✅ 날짜 필터 영역 */}
      <div css={s.filterBox}>
        <label>
          년도:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2023">2023년</option>
            <option value="2024">2024년</option>
            <option value="2025">2025년</option>
          </select>
        </label>
        <label>
          월:
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
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

      {/* ✅ 근무자 실적 표 */}
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
