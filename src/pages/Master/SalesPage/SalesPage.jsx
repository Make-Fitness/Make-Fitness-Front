/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";
import { fetchSalesReport } from "../../../apis/salesApi";

const SalesPage = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filtered, setFiltered] = useState([]);

    const toComma = (num) => num.toLocaleString();

    const handleFilter = async () => {
        if (!startDate || !endDate) return;

        try {
            const rows = await fetchSalesReport(startDate, endDate);
            console.log("📦 매출 응답:", rows);

            const result = rows.map((row) => {
                const total = row.totalAmount ?? 0;
                const pt = row.ptTotalAmount ?? 0;
                const pilates = row.pltTotalAmount ?? 0;
                const fitness = row.htTotalAmount ?? 0;

                return {
                    date: row.date.slice(0, 10),
                    totalAmount: total,
                    pt,
                    pilates,
                    fitness,
                };
            });

            setFiltered(result);
        } catch (err) {
            console.error("매출 데이터 조회 실패:", err);
            setFiltered([]);
        }
    };

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

    return (
        <div css={s.sales}>
            <h2>매출</h2>

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
                <button onClick={handleFilter} css={s.button}>기간적용</button>
            </div>

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
