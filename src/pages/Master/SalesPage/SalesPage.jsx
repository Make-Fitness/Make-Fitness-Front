/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./style";

const SalesPage = () => {
    const dummyData = [
        {
        date: "2023-03-31",
        totalAmount: "1,390,000",
        pass: "1,170,000",
        pt: "0",
        pilates: "0",
        refund: "0",
        fitness: "60,000",
        personal: "60,000",
        gear: "100,000",
        },
        {
        date: "2023-03-30",
        totalAmount: "6,025,910",
        pass: "3,250,910",
        pt: "1,200,000",
        pilates: "0",
        refund: "0",
        fitness: "660,000",
        personal: "175,000",
        gear: "50,000",
        },
    ];

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filtered, setFiltered] = useState(dummyData);

    // ✅ 금액 문자열을 숫자로 변환
    const toNumber = (str) => Number(str.replace(/,/g, ""));

    // ✅ 숫자를 천 단위 , 찍기
    const toComma = (num) => num.toLocaleString();

    // ✅ 필터링 핸들러
    const handleFilter = () => {
        if (!startDate || !endDate) return;

        const filteredData = dummyData.filter((row) => {
        return row.date >= startDate && row.date <= endDate;
        });

        setFiltered(filteredData);
    };

    // ✅ 합계 계산
    const total = filtered.reduce(
        (acc, row) => {
        acc.totalAmount += toNumber(row.totalAmount);
        acc.pass += toNumber(row.pass);
        acc.pt += toNumber(row.pt);
        acc.pilates += toNumber(row.pilates);
        acc.refund += toNumber(row.refund);
        acc.fitness += toNumber(row.fitness);
        acc.personal += toNumber(row.personal);
        acc.gear += toNumber(row.gear);
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
            <button onClick={handleFilter}>기간적용</button>
        </div>


        <table css={s.salesTable}>
            <thead>
            <tr>
                <th>날짜</th>
                <th>매출</th>
                <th>회원권</th>
                <th>PT</th>
                <th>필라테스</th>
                <th>환불</th>
                <th>기타</th>
            </tr>
            </thead>
            <tbody>
            {filtered.map((row, index) => (
                <tr key={index}>
                <td>{row.date}</td>
                <td>{row.totalAmount}</td>
                <td>{row.pass}</td>
                <td>{row.pt}</td>
                <td>{row.pilates}</td>
                <td>{row.refund}</td>
                <td>{row.gear}</td>
                </tr>
            ))}
            <tr>
                <td><strong>총합계</strong></td>
                <td>{toComma(total.totalAmount)}</td>
                <td>{toComma(total.pass)}</td>
                <td>{toComma(total.pt)}</td>
                <td>{toComma(total.pilates)}</td>
                <td>{toComma(total.refund)}</td>
                <td>{toComma(total.gear)}</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
    };

export default SalesPage;
