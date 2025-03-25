/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./style";

const SalesPage = () => {
    const dummyData = [
        {
        date: "2023-03-31",
        totalAmount: "1,390,000",
        count: 11,
        pass: "1,170,000",
        pt: "0",
        pilates: "0",
        refund: "0",
        fitness: "60,000",
        personal: "60,000",
        gear: "100,000",
        etc: "0",
        },
        {
        date: "2023-03-30",
        totalAmount: "6,025,910",
        count: 18,
        pass: "3,250,910",
        pt: "1,200,000",
        pilates: "0",
        refund: "0",
        fitness: "660,000",
        personal: "175,000",
        gear: "50,000",
        etc: "0",
        },
    ];

    return (
        <div css={s.sales}>
        <h2>매출현황</h2>

        {/* 🔎 필터 영역 */}
        <div css={s.filterArea}>
            <input type="date" />
            <span>~</span>
            <input type="date" />
            <button>기간적용</button>
            <select>
            <option>상품(요약)</option>
            <option>이용권</option>
            <option>PT</option>
            <option>필라테스</option>
            </select>
        </div>

        {/* 설명 */}
        <p css={s.description}>
            오늘날짜 / 매출실적 / 결제건수 / 이용권 / PT / 필라테스 / 환불건수 / 기타(여유생기면 락카/운동복)
        </p>

        {/* 📊 테이블 */}
        <table css={s.salesTable}>
            <thead>
            <tr>
                <th>날짜</th>
                <th>매출 실적</th>
                <th>결제건수</th>
                <th>이용권</th>
                <th>PT</th>
                <th>필라테스</th>
                <th>환불</th>
                <th>운동복</th>
                <th>개인락커</th>
                <th>기타</th>
            </tr>
            </thead>
            <tbody>
            {dummyData.map((row, index) => (
                <tr key={index}>
                <td>{row.date}</td>
                <td>{row.totalAmount}</td>
                <td>{row.count}</td>
                <td>{row.pass}</td>
                <td>{row.pt}</td>
                <td>{row.pilates}</td>
                <td>{row.refund}</td>
                <td>{row.fitness}</td>
                <td>{row.personal}</td>
                <td>{row.gear}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default SalesPage;
