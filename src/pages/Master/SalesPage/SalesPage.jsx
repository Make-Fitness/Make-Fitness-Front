/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";
import { fetchSalesReport } from "../../../apis/salesApi";

const SalesPage = () => {
  // 날짜 상태
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 필터된 매출 목록
  const [filtered, setFiltered] = useState([]);

  // 숫자를 쉼표포함 문자열로 포맷
  const toComma = (num) => num.toLocaleString();

  // 날짜 기반 매출 조회 함수
  const handleFilter = async (sDate = startDate, eDate = endDate) => {
    if (!sDate || !eDate) return;

    try {
      const rows = await fetchSalesReport(sDate, eDate);
      console.log("📦 매출 응답:", rows);

      // API 응답을 표 형태로 변환
      const result = rows.map((row) => {
        return {
          date: row.date.slice(0, 10),
          totalAmount: row.totalAmount ?? 0,
          pt: row.ptTotalAmount ?? 0,
          pilates: row.pltTotalAmount ?? 0,
          fitness: row.htTotalAmount ?? 0,
        };
      });

      setFiltered(result);
    } catch (err) {
      console.error("매출 데이터 조회 실패:", err);
      setFiltered([]);
    }
  };

  // 총합계 계산
  const total = filtered.reduce(
    (acc, row) => {
      acc.totalAmount += row.totalAmount;
      acc.pt += row.pt;
      acc.pilates += row.pilates;
      acc.fitness += row.fitness;
      return acc;
    },
    {
      totalAmount: 0,
      pt: 0,
      pilates: 0,
      fitness: 0,
    }
  );

  // 초기 날짜 세팅: 오늘 날짜
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setStartDate(today);
    setEndDate(today);
    handleFilter(today, today);
  }, []);

  // 메인 렌더링
  return (
    <div css={s.sales}>
      <h2>매출</h2>

      {/* 날짜 필터 영역 */}
      <div css={s.filterArea}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>~</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={() => handleFilter()} css={s.button}>
          기간적용
        </button>
      </div>

      {/* 매출 표 */}
      <table css={s.salesTable}>
        <thead>
          <tr>
            <th>날짜</th>
            <th>총매출</th>
            <th>헬스</th>
            <th>PT</th>
            <th>필라테스</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{toComma(row.totalAmount)}</td>
              <td>{toComma(row.fitness)}</td>
              <td>{toComma(row.pt)}</td>
              <td>{toComma(row.pilates)}</td>
            </tr>
          ))}

          {/* 총합계 행 */}
          <tr>
            <th>총합계</th>
            <td>{toComma(total.totalAmount)}</td>
            <td>{toComma(total.fitness)}</td>
            <td>{toComma(total.pt)}</td>
            <td>{toComma(total.pilates)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;
