/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./style";

const SalesPage = () => {
    const [salesData, setSalesData] = useState([]);

    const toNumber = (str) => Number(str?.toString().replace(/,/g, "") || 0);
    const toComma = (num) => Number(num).toLocaleString();

    useEffect(() => {
        const today = new Date();
        const formatted = today.toISOString().slice(0, 10);

        fetch(`/api/makefitness/admin/sales/report?startDate=${formatted}&endDate=${formatted}`)
            .then((res) => res.text())
            .then((text) => {
                console.log("서버 응답:", text);
                try {
                    const json = JSON.parse(text);
                    // null 값 제거
                    const cleaned = Array.isArray(json)
                        ? json.filter(row => row && typeof row === "object")
                        : [];
                    setSalesData(cleaned);
                } catch (err) {
                    console.error("JSON 파싱 실패, 실제 응답:", text);
                }
            })
            .catch((err) => console.error("매출 데이터 로딩 실패", err));
    }, []);

    const total = salesData.reduce(
        (acc, row) => {
            // 필드 값이 없을 경우 0 처리
            acc.totalSales += toNumber(row?.totalSales);
            acc.healthSales += toNumber(row?.healthSales);
            acc.ptSales += toNumber(row?.ptSales);
            acc.pilatesSales += toNumber(row?.pilatesSales);
            return acc;
        },
        {
            totalSales: 0,
            healthSales: 0,
            ptSales: 0,
            pilatesSales: 0,
        }
    );

    return (
        <div css={s.sales}>
            <h2>매출관리</h2>

            <table css={s.salesTable}>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>총 매출</th>
                        <th>회원권</th>
                        <th>PT</th>
                        <th>필라테스</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((row, index) => (
                        <tr key={index}>
                            <td>{row?.date || "-"}</td>
                            <td>{toComma(row?.totalSales)}</td>
                            <td>{toComma(row?.healthSales)}</td>
                            <td>{toComma(row?.ptSales)}</td>
                            <td>{toComma(row?.pilatesSales)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>총합계</strong></td>
                        <td>{toComma(total.totalSales)}</td>
                        <td>{toComma(total.healthSales)}</td>
                        <td>{toComma(total.ptSales)}</td>
                        <td>{toComma(total.pilatesSales)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesPage;
