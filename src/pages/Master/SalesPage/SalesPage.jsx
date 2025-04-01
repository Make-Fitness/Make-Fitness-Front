/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";import { fetchSalesReport } from "../../../apis/salesApi";
 // ✅ API 분리 후 import

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
                const refund = 0;
                const gear = 0;
                const pass = total - pt - pilates - fitness - refund - gear;

                return {
                    date: row.date.slice(0, 10),
                    totalAmount: total,
                    pt,
                    pilates,
                    fitness,
                    refund,
                    gear,
                    pass,
                    personal: 0,
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
            acc.pass += row.pass;
            acc.pt += row.pt;
            acc.pilates += row.pilates;
            acc.refund += row.refund;
            acc.fitness += row.fitness;
            acc.personal += row.personal;
            acc.gear += row.gear;
            return acc;
        },
        {
            totalAmount: 0,
            pass: 0,
            pt: 0,
            pilates: 0,
            refund: 0,
            fitness: 0,
            personal: 0,
            gear: 0,
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
                        <th>매출</th>
                        <th>회원권</th>
                        <th>PT</th>
                        <th>필라테스</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((row, index) => (
                        <tr key={index}>
                            <td>{row.date}</td>
                            <td>{toComma(row.totalAmount)}</td>
                            <td>{toComma(row.pass)}</td>
                            <td>{toComma(row.pt)}</td>
                            <td>{toComma(row.pilates)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>총합계</strong></td>
                        <td>{toComma(total.totalAmount)}</td>
                        <td>{toComma(total.pass)}</td>
                        <td>{toComma(total.pt)}</td>
                        <td>{toComma(total.pilates)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesPage;